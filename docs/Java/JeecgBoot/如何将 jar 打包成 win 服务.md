# ��ν�JeecgBoot�����JARת��ΪWindows����

��JeecgBoot�����JARת��ΪWindows�����ͨ���������ַ���ʵ�֣��Ƽ�ʹ��WinSW��������JeecgBoot��������ѣ���

## һ��WinSW�������Ƽ���
1. **����׼��**  
   ����[WinSW.NET4.exe](https://github.com/winsw/winsw/releases)��������Ϊ��JARͬ���Ŀ�ִ���ļ�����`jeecg-service.exe`����

2. **�����ļ�**  
   ����ͬ��XML�ļ�����`jeecg-service.xml`����
   ```xml
   <service>
     <id>jeecg-boot</id>
     <name>JeecgBoot Service</name>
     <description>JeecgBoot��̨����</description>
     <executable>java</executable>
     <arguments>-jar "C:\app\jeecg-system-start-3.7.3.jar" --server.port=8080</arguments>
     <logpath>C:\app\logs</logpath>
     <logmode>rotate</logmode>
   </service>
   ```
   �ؼ�����˵����  
   - `<arguments>`��ָ��JAR����·����Spring Boot��������  
   - `<logmode>`������Ϊ`rotate`��ֹ��־����

3. **��װ����**  
   ����ԱȨ��ִ�У�
   ```cmd
   jeecg-service.exe install
   net start jeecg-boot
   ```

## ����NSSM������ͼ�λ�������
1. **���ع���**  
   ��[nssm.cc](https://nssm.cc)��ȡ���°汾��

2. **��������**  
   ִ�������GUI���棺
   ```cmd
   nssm install jeecg-service
   ```
   ����д��  
   - Path: `java.exe`·������`C:\Program Files\Java\jdk-17\bin\java.exe`��  
   - Arguments: `-jar "D:\jeecg\jeecg-system-start-3.7.3.jar"`  
   - Startup Directory: JAR����Ŀ¼

## ����exe4j����������EXE��
1. **��������**  
   ��װexe4j��ѡ��"Service"ģʽ��  
   - ָ��Main��Ϊ`org.springframework.boot.loader.JarLauncher`  
   - ���VM������`-Dfile.encoding=UTF-8 -Xmx512m`

2. **���ɷ���**  
   ���EXE�ļ������������ű����������ͣ��

## ע������
1. **�˿ڳ�ͻ**  
   ��JAR��ǶTomcat������`application-prod.yml`������`server.port`�����ͻ��

2. **�ڴ�����**  
   ������XML/EXE���������JVM������`-Xms256m -Xmx1024m`��

3. **�������**  
   ����JARʱ����ִ��`net stop jeecg-boot`���滻�ļ�����������

4. **��־�鿴**  
   WinSW������־Ĭ�ϴ洢��`<logpath>`Ŀ¼����ͨ��`Event Viewer`�鿴ϵͳ������

