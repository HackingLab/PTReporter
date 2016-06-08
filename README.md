# 中文版渗透测试报告生成系统 Serpico
## SimplE RePort wrIting and CollaboratiOn tool
Serpico is a penetration testing report generation and collaboration tool. It was developed to cut down on the amount of time it takes to write a penetration testing report.

Video Demo of Functionality:

[Serpico - Demo 1](https://www.youtube.com/watch?v=G_qYcL4ynSc)

[Additional Video Demos](https://github.com/MooseDojo/Serpico/wiki#online-demos)

## Installation

### Docker
Serpico has a supported Docker image if you wanted to get started quickly:
[Running Serpico From Docker](https://github.com/MooseDojo/Serpico/wiki/Running-Serpico-From-Docker)

### Building Serpico
Serpico is written in Ruby using Sinatra, Bootstrap, and Haml. Installation should be easy:

- You will need a copy of Ruby. RVM is suggested (https://rvm.io/rvm/install). ruby version 2.1.5 is supported.

```
rvm install 2.1.5
rvm use 2.1.5
```

- If you are running Ubuntu (or also verified on Kali) you will need a couple of dependencies:
```
apt-get install libsqlite3-dev libxslt-dev libxml2-dev zlib1g-dev gcc
```

- Go into Serpico and install the proper gems:
```
cd Serpico
gem install bundler
bundle install
```

- 第一次使用使用以下命令进行初始化:
```
ruby scripts/first_time.rb
```

使用以下命令启动:
```
ruby serpico.rb
```

Note: 第一次使用进行初始化时候回自动创建一个自签名证书,你也可以自己修改,只要放到程序目录里,若修改证书名称只要稍作配置就可以

```
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 700
```

启动以后使用浏览器访问: https://127.0.0.1:8443 (端口可以根据你设置的进行更改).


## About Serpico
Serpico is at its core a report generation tool but targeted at creating information security reports. When building a report the user adds "findings" from the template database to the report. When there are enough findings, click 'Generate Report' to create the docx with your findings. The docx design comes from a Report Template which can be added through the UI; a default one is included. The Report Templates use a custom Markup Language to stub the data from the UI (i.e. findings, customer name, etc) and put them into the report.

## Features
#### Report Template Editing is Easy
**Philosophy: Editing a report template should be easy.**
During peer review we would constantly ran into "little things" we were fixing from the report template; an extra space here, a misspelling there. But it adds up. With Serpico, "fix" the report template, upload it back through the UI, and generate a new report; the error should be fixed permanently.

#### Template Database
**Philosophy: We do not need to write most findings from scratch.**
Most findings have been found in a previous assessment. In Serpico, all authors can pull findings from the template database and add to the report. A user can also 'Upload' a finding they made into the Template Database to share with everyone.

#### Attachment Collaboration
**Philosophy: It should be easy to share files with teammates.**
Use the 'Add Attachment' functionality to store a file (e.g. screenshots, nmap scans) or share with teammates on a pen test. No thumb drive swapping or e-mailing, just log into the UI and download the files. At the end of the assessment everything traded or generated for that assessment is in one place.


## Microsoft Word Meta-Language
The Meta language used for Microsoft Word was designed to be as simple as possible while still serving enough features to create a basic penetration test report.  That being said it has a learning curve (and many bugs) and I _highly_ suggest looking at "Serpico - Report.docx" or "Serpico - No DREAD.docx" and editing these rather than working from scratch.

Inserting Screenshots
https://github.com/MooseDojo/Serpico/wiki/Inserting-Screenshots

This is an area we know needs development so e-mail me with any ideas.

See the Wiki for more information, [Serpico Meta-Language In Depth](https://github.com/MooseDojo/Serpico/wiki/Serpico-Meta-Language-In-Depth)

## Support
- As questions come up we try to add them to the [Wiki](https://github.com/MooseDojo/Serpico/wiki)
- IRC: [#therealserpico](http://webchat.freenode.net/?channels=%23therealserpico&uio=d4) on freenode
- If all else fails create an issue and we will try to get it answered

## GOTCHAS
- Microsoft has a really annoying habit of changing a character for you. Always beware of this when working with the meta language

## Huge Thanks
* Wouldn't exist without testing, support, and feature suggestion of the rest of the [Moosedojo team!](https://github.com/MooseDojo).
* @d4rkd0s for the great logo work. Thanks!



##中文版使用说明
- 详细说明请参考wiki
Meta language In-Depth

符号列表说明:

- Ω - 一个简单的替换型变量.

```
ΩFULL_COMPANY_NAMEΩ
```

渲染为::
Acme Corporation
- § - 一个用户自定义变量. 用户自定义变量可以通过UI进行配置,可以在报告中引用,用户自定义变量在报告中特别好用

```
§my_executive_summary§
```

渲染为::
Whatever the user has placed in the UI.

- ¬ - for each
```
¬finding¬
内容
∆
```
渲染为: a for loop for every finding and prints 'STUFF' in each loop. 

- π - 循环中的替换变量. 在循环中就不要用 Ω 作为替换变量了.

```
¬report/findings_list/findings¬
πtitleπ
∆
```
Renders the finding title for every finding in the findings_list of the report.
NOTE: You can use multiple if statements with for:

¬report/findings_list/findings:::DREAD_TOTAL<50:::DREAD_TOTAL>30¬
πtitleπ
∆

# This is read as:
for each finding
if dread_total is less than 50
if dread_total is greater than 30

print title

close for loop and both if's

- æ - 在表格中使用的循环变量,每一个表示一行

::: - 在行中表示if的意思

æreport/findings_list/findings:::DREAD_TOTAL>35æ

Renders a new table row every finding with a DREAD total greater than 35.
∞ - Substituition variable inside of a for loop inside of a table. Only used in a table.

æreport/findings_list/findings:::DREAD_TOTAL>35æ ∞title∞

Renders a new table row with the title for every finding with a DREAD total greater than 35.
- † - if 条件

† DREAD_SCORE > 1 †
HELLO WORLD
¥

Renders a HELLO WORLD if the DREAD_SCORE is > 1
- µ - 初始化choose/when结构 Initiates choose/when structure

ƒ - The when value in a choose/when

å - Ends the choose/when not in a for-each

≠ - Ends the choose/when inside of a for-each

¬overview/paragraph¬ 
µCONDITIONALµ π.π
ƒcodeƒ π.π
ƒitalicsƒ π.π
÷ π.π ≠

This will take each paragraph from the overview section of the finding. 
If the paragraph is labelled as code then the paragraph will be formatted as code. 
The "." above means the paragraph variable from the 'overview/paragraph' for loop. 

∆ - 结束each

¥ - 结束if

一个漏洞包含了下面的这些属性,可以使用变量进行访问. 例如:

¬report/findings_list/findings¬
πtitleπ
∆
属性列表:

title
damage
reproducability
exploitability
affected_users
discoverability
effort
type
dread_total
overview
poc
remediation
notes
assessment_type
references
risk
affected_hosts
presentation_points
Status API Training Shop Blog About

