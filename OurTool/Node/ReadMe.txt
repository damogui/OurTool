App_Data权限说明：
	DefaultPage.xml为匿名访问的页面
	MfgPage.xml为MFG能访问的页面
	OrgPage.xml为机构能访问的页面
	ParentPage.xml为家长能访问的页面
	PartnerPage.xml为合伙人能访问的页面
	StudentPage.xml为学生能访问的页面
	TeacherPage.xml为老师能访问的页面


Areas：
	Teacher为老师端
	Student为学生端
	Partner为合伙人端
	Parents为微信端
	Org为机构管理端
	Management为MFG管理端
	Experience为体验端


安装：

    安装nodeJS

    npm install webpack -g

    npm install gulp -g

    npm install (这个命令需要在项目根目录下执行)

	升级

	npm install

打包命令：

    1.测试包

        gulp (这个命令需要在项目根目录下执行)

    2.正式包：

        删除bundle文件夹，然后执行下面命令

        gulp package （这个命令需要在项目根目录下执行），确保生成bundle/version 文件夹


		将bundle/version/mfg-word/mfg-word-manage 文件夹下的Areas、Views 文件替换到 发布包里
		 


	3.删除安装
		
		npm install rimraf -g

		rimraf node_modules

注： 
  
    1. 平时只需要执行gulp命令即可

    2. 项目根目录指的是存在"egword/package.json"的目录。




	发布项目(Jexus)：

	1.生成发布项目，配置模式为Release

	2.打包egword下的JS/CSS等静态文件，命令为gulp package

	3.将生成项目的配置文件Web.config删除，将生成项目下bin目录的Microsoft.Web.Infrastructure.dll文件删除（mono自带）

	4.备份线上项目，命令如下（注意日期）：

		cp -r /usr/jexus/siteconf /opt/backup/siteconf-2017-3-27
		cp -r /var/www /opt/backup/www-2017-3-27

	5.将线上的项目除Web.config及MP_verify_Zm0fIW1W5R90iV8d.txt保留，其它所有文件删除

	6.将生成的项目复制到线上

	7.发布完成

