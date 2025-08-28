# 如何将JeecgBoot打包的JAR转换为Windows服务

将JeecgBoot打包的JAR转换为Windows服务可通过以下三种方案实现，推荐使用WinSW方案（与JeecgBoot兼容性最佳）：

## 一、WinSW方案（推荐）
1. **工具准备**  
   下载[WinSW.NET4.exe](https://github.com/winsw/winsw/releases)并重命名为与JAR同名的可执行文件（如`jeecg-service.exe`）。

2. **配置文件**  
   创建同名XML文件（如`jeecg-service.xml`）：
   ```xml
   <service>
     <id>jeecg-boot</id>
     <name>JeecgBoot Service</name>
     <description>JeecgBoot后台服务</description>
     <executable>java</executable>
     <arguments>-jar "C:\app\jeecg-system-start-3.7.3.jar" --server.port=8080</arguments>
     <logpath>C:\app\logs</logpath>
     <logmode>rotate</logmode>
   </service>
   ```
   关键参数说明：  
   - `<arguments>`需指定JAR绝对路径及Spring Boot启动参数  
   - `<logmode>`建议设为`rotate`防止日志过大

3. **安装服务**  
   管理员权限执行：
   ```cmd
   jeecg-service.exe install
   net start jeecg-boot
   ```

## 二、NSSM方案（图形化操作）
1. **下载工具**  
   从[nssm.cc](https://nssm.cc)获取最新版本。

2. **服务配置**  
   执行命令弹出GUI界面：
   ```cmd
   nssm install jeecg-service
   ```
   需填写：  
   - Path: `java.exe`路径（如`C:\Program Files\Java\jdk-17\bin\java.exe`）  
   - Arguments: `-jar "D:\jeecg\jeecg-system-start-3.7.3.jar"`  
   - Startup Directory: JAR所在目录

## 三、exe4j方案（生成EXE）
1. **工具配置**  
   安装exe4j后选择"Service"模式：  
   - 指定Main类为`org.springframework.boot.loader.JarLauncher`  
   - 添加VM参数：`-Dfile.encoding=UTF-8 -Xmx512m`

2. **生成服务**  
   输出EXE文件后配合批处理脚本管理服务启停。

## 注意事项
1. **端口冲突**  
   若JAR内嵌Tomcat，需在`application-prod.yml`中配置`server.port`避免冲突。

2. **内存限制**  
   建议在XML/EXE配置中添加JVM参数：`-Xms256m -Xmx1024m`。

3. **服务更新**  
   更新JAR时需先执行`net stop jeecg-boot`，替换文件后重启服务。

4. **日志查看**  
   WinSW方案日志默认存储在`<logpath>`目录，可通过`Event Viewer`查看系统级错误。

