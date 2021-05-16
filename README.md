# bank-admin

## github pages构建问题
无法生成访问网址，提示'Your site is having problems building: Unable to build page. Please try again later.'

第一次push到远程库能生成网址打开页面，之后再push就报如上错误。即使回退到第一次能正常访问的版本，也是报如上错误，所以可以排除代码问题，是pages构建问题。码云由于维护，也无法提供在线部署功能，所以无法在线查看。

要看项目，请clone项目或下载项目的zip包到本地，通过node+express部署查看，具体步骤如下。

## 本地node+express部署打开步骤

安装express
```
npm install express -g //express框架
npm install express-generator -g //express项目生成插件
``` 
生成项目并启动，执行如下命令
```
//新建文件夹，在该文件下依次执行如下命令
express bank_admin //创建项目bank-admin
cd myStudy //进入该目录
npm install //安装组件 
```
将项目dist文件里的内容拷贝到bank-adim的public文件夹下，运行命令
```
npm start //启动项目
```

浏览器打开http://localhost:3000/访问
