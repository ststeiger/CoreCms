Welcome to CoreCMS!
===================

### Table of contents


**What is CoreCMS ?**

> CoreCMS is a modern, secure, multi-platform open-source **Content Management System**, which empowers you to create sophisticated multi-lingual multi-tenant capable websites as well as appealing secure and powerful online applications. 
> 
> CoreCMS can be deployed painlessly on IIS, Docker, Engine-X (nginx), Apache as well as on a myriad of different server platforms. Using the Microsoft .NET-CORE framework ensures that it will not only run neatly on a Microsoft-stack, which will be supported long into the future, but just as well on Linux and Mac. 
> 
> CoreCMS can be run standalone without a database, or with any mayor relational database (details below), including Cassandra. Using the dapper-framework created by stackoverflow.com, it not only runs on multiple RDBMS systems, but also does so with extremely high performance.
> 
> CoreCMS aims to be easy and painless to install on a variety of platforms, all while maintaning a sustainable data quality, coupled with high usability and high maintainability.  CoreCMS can be run without administrative privileges, and without installing anything, even when a web-server is not installed.
>
> CoreCMS can be combined with <i class="icon-provider-gdrive"></i> **Google Drive** and <i class="icon-provider-dropbox"></i> **Dropbox** to have your documents saved in the *Cloud*. The synchronization mechanism takes care of uploading your modifications or downloading the latest version of your documents.
> 
> You can render *LaTeX* mathematical expressions using **MathJax**, as on [math.stackexchange.com][1]:
> e.g. the *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ via the Euler integral
> $$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$
> You can also render UML diagrams, for example sequence diagrams like this:
> 
```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

>And flow charts like this:

```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```



#### Releases
You can download the latest-release >here<, or see a list of any other releases >here<


#### Quick-start guide
To see how to get the release running, please follow the Quick-Start-Guide >HERE<


Building
-------------

You can build CoreCMS using Visual Studio 2017 Community on Windows (free), or using JetBrains Rider on Linux/Mac/Windows. 

You can also build CoreCMS without IDE, using the .NET-Core command-line tools. <br />
To do so, open a command prompt, and go the the directory where the file CoreCMS.sln is in.
Then do the following:

**Build for Windows x86-64:**
> dotnet restore -r win-x64<br />
> dotnet build -r win-x64<br />
> dotnet publish -f netcoreapp2.0 -c Release -r win-x64<br />

**Build for Windows x86-32:**
> dotnet restore -r win-x86<br />
> dotnet build -r win-x86<br />
> dotnet publish -f netcoreapp2.0 -c Release -r win-x86<br />

**Build for Linux x86-64:**
> dotnet restore -r linux-x64<br />
> dotnet build -r linux-x64<br />
> dotnet publish -f netcoreapp2.0 -c Release -r linux-x64<br />


**Build for Linux ARM-32 (Raspberry PI/Chromebook/Android):**
> dotnet restore -r linux-arm<br />
> dotnet build -r linux-arm<br />
> dotnet publish -f netcoreapp2.0 -c Release -r linux-arm<br />


**Build for Linux x86-32:**
> **not supported by framework**


Technical Details
-------------

**CoreCMS uses the following technologies:**
> 
> - Microsoft ASP.NET-**CORE** 2.0 with C#
> - SASS/SCSS/CSS3
> - [TypeScript](http://www.typescriptlang.org)/CommonJS/Promises/**Async**/WebSockets/Polyfills/CORS
> - MVC / URL-Routing
> - CSRF-Module, XSS-Module,Anti-ClickJacking-Headers
> - Data-Driven Documents (d3js) / SVG
> - SQL (Microsoft SQL-Server 2012+, PostgreSQL, Oracle, MariaDB/MySQL 10.2+, Apache Cassandra)
> - IANA JWT
> - OpenPGP
> - Let's Encrypt SSL

(no jQuery/AngularJS/ReactJS/VueJS)

**CoreCMS uses the following technologies for build:**
> - .NET-Core SDK
> - TypeScript SDK
> - SASS/SCSS via NodeJS
> - Bower
> - NPM
> - Gulp
> - Uglify2
> - CssNano
> - WebPack & WebPack-Stream
> - Google-Closure-Compiler (Advanced Mode - Closure-Compiler requires Java) 




**Browser compatibility**
> - Google-Chrome
> - Microsoft Internet Explorer 11
> - Microsoft Edge 15+
> - Apple Safari
> - Firefox
> - Opera



### Build Status


Bellow, you see the current build-status of the master-branch:

| Item     | Code-Coverage | Build-Status   |
| :------- | ------------: | :------------: |
| Windows  | 100%          |  ![Continuous Integration Status](https://travis-ci.org/ststeiger/RubyService.svg?branch=master)        |
| Linux    | 100%          |  ![Continuous Integration Status](https://travis-ci.org/ststeiger/RubyService.svg?branch=master)        |
| Mac      | 100%          |  ![Continuous Integration Status](https://travis-ci.org/ststeiger/RubyService.svg?branch=master)        |



### Support CoreCMS

[![](https://cdn.monetizejs.com/resources/button-32.png)](https://monetizejs.com/authorize?client_id=ESTHdCYOi18iLhhO&summary=true)
