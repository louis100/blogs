
�����ǽ��������Աǰ�����������װ��C�̵��¿ռ䲻����������������ǻ����ض���Ǩ�������Ԥ����ʩ��ȫ������ҿ����в�����

---

###  ?? һ�����������ض������ý��������
#### 1. **Node.js ��Ŀ��npm/yarn/pnpm��**
```powershell
# �����»���Ŀ¼����D�̣�
mkdir D:\nodejs\npm_cache
mkdir D:\nodejs\npm_global

# �޸�npm����
npm config set prefix "D:\nodejs\npm_global" --global
npm config set cache "D:\nodejs\npm_cache" --global

# Yarn����
yarn config set global-folder "D:\nodejs\yarn_global"
yarn config set cache-folder "D:\nodejs\yarn_cache"
```

#### 2. **Python ��Ŀ��pip��**
```powershell
# �½�Ŀ¼
mkdir D:\python\pip_cache
mkdir D:\python\site-packages

# �޸�pip����
pip config set global.cache-dir "D:\python\pip_cache"
pip config set global.target "D:\python\site-packages"
```

#### 3. **Java/Maven ��Ŀ**
1. �������вֿ⣺
   ```powershell
   robocopy C:\Users\�û���\.m2\repository D:\maven-repo /MIR
   ```
2. �޸� `~/.m2/settings.xml`��
   ```xml
   <settings>
     <localRepository>D:\maven-repo</localRepository>
   </settings>
   ```

---

###  ?? ����Ǩ�����������������ͷ�C�̿ռ䣩
#### 1. **Node_modules Ǩ�ƹ���**
```powershell
# ��װǨ�ƹ���
npm install -g move-node-modules

# ����Ŀ��Ŀ¼ִ��
move-node-modules --destination D:\projects\dependencies
```

#### 2. **Python���⻷��Ǩ��**
```powershell
# 1. �������⻷��
robocopy C:\venv D:\new_venv /MIR

# 2. �޸ļ���ű�
(Get-Content D:\new_venv\Scripts\activate) -replace 'C:\\venv', 'D:\\new_venv' | Set-Content D:\new_venv\Scripts\activate
```

#### 3. **Windows�������ӣ�ԭ��Ǩ�ƣ�**
```powershell
# ʾ����Ǩ��npm���棨����ԭ·�����ʣ�
robocopy C:\Users\�û���\AppData\Roaming\npm-cache D:\npm-cache /MIR
rmdir C:\Users\�û���\AppData\Roaming\npm-cache
mklink /J C:\Users\�û���\AppData\Roaming\npm-cache D:\npm-cache
```

---

###  ??? ����Ԥ����ʩ������δ��ռ�ã�
#### 1. **ϵͳ������**
| �������� | �Ƽ�ֵ | ���� |
|---------|--------|------|
| `NPM_CONFIG_PREFIX` | `D:\nodejs\npm_global` | ȫ�ְ�װλ�� |
| `PIP_TARGET` | `D:\python\site-packages` | Python��Ŀ¼ |
| `YARN_GLOBAL_FOLDER` | `D:\nodejs\yarn_global` | Yarnȫ��Ŀ¼ |

#### 2. **IDE���ø���**
- **VSCode**������Ŀ`.vscode/settings.json`��ӣ�
  ```json
  {
    "npm.packageManager": "yarn",
    "terminal.integrated.env.windows": {
      "NPM_CONFIG_CACHE": "D:/nodejs/npm_cache"
    }
  }
  ```
- **IntelliJ IDEA**��`File > Build > Build Tools` ����дMaven���زֿ�·��

#### 3. **��Ŀ������**
����Ŀ��Ŀ¼���������ļ���
```bash
# .npmrc (Node��Ŀ)
cache=D:/nodejs/project_cache
prefix=D:/nodejs/project_global

# .mvn/jvm.config (Maven��Ŀ)
-Dmaven.repo.local=D:/maven-repo/projectA
```

---

###  ?? �ġ������ߣ������Ƽ���
1. **TreeSize Free**�����ӻ�����C�̴��ļ�
2. **BleachBit**����ȫ������ʱ�ļ�
3. **Windows�Դ�**��
   ```powershell
   cleanmgr /sageset:65535 & cleanmgr /sagerun:65535  # ���������
   ```

>  ?? **��������**��
> 1. ��ִ�л��������ض���������Ч��
> 2. ��Ǩ�����������������ͷſռ䣩
> 3. �������IDE/��Ŀ������Ԥ��δ�����⣩
> 4. ����ʹ��������ά��

ͨ���˷������ɽ�����ռ�ô�C��ת��������������ͬʱ���ֿ��������������У�������װ�κι��ߡ�Ǩ�ƺ�C�̿��ͷ���ʮGB�ռ䣨����Ŀ��ģ��������

�������ӣ�
1.[�й��Node.js�������Ƶ�̳�,nodejs���ֵ����� - ��������](http://www.bilibili.com/video/BV1gM411W7ex?p=85)
2.[30 �������� Webpack - ��������](http://www.bilibili.com/video/BV11g411y7Sd)
3.[��Сʱ,��������ǰ�������Ż����� - ��������](http://www.bilibili.com/video/BV1GAWDe7E3k?p=14)
4.[��2025���°桿ǰ��Webpack5����Ӧ��ƪ+�߼�Ӧ��ƪ��Ƶ�̳�(ȫ95��) - ��������](http://www.bilibili.com/video/BV1AywmeKE79?p=85)
5.[ǧ�����webǰ�˸�Ƶ��������Ƶ�̳�,kerwin��ǰ�������ؼ�(����) - ��������](http://www.bilibili.com/video/BV1tL411k7VU)
6.[��2025���°桿ǰ�˹��̻��������ŵ���ͨ(ȫ231��) - ��������](http://www.bilibili.com/video/BV1byr5YeEMk?p=31)
7.[ǰ�˹��̻�������Щ���Ż����� - ��Ӱ����](http://zhuanlan.zhihu.com/p/1080645843)
8.[���ʹ�� Webpack ������Ż�ǰ����Ŀ? - CSDN����](https://blog.csdn.net/m0_61505785/article/details/145436197)
9.[�ܽἸ�� webpack ����Ż��ķ���,ǰ����Ŀ�ر�-CSDN���� - CSDN����](https://blog.csdn.net/ch834301/article/details/113287010)
10.[Serein����Ůʿ - Serein����Ůʿ](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5621145295450524803)
11.[ǰ�������Ż� -- ȫ�����Ż�(ǧ�ָɻ�) - Anita](http://zhuanlan.zhihu.com/p/554089198)
12.[ǰ�������Ż�(21���Ż�+7�ֶ�λ��ʽ) - www.cloud.tencent.com](https://www.cloud.tencent.com/developer/article/1733071)
13.[ǰ�������Ż����������ѹ��82%������ٶ�����65% - ��Ѷ��](https://cloud.tencent.com/developer/article/2285316)