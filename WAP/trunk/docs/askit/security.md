## Shiro权限配置

权限模块基于apache-shiro开发，并完成了系统集群用户Session共享管理，可在线管理用户权限等功能。

### 一般配置使用

#### POM引用
```xml
<dependency>
    <groupId>cn.bgonline.askit.modules</groupId>
    <artifactId>askit-shiro</artifactId>
    <version>${askit.version}</version>
</dependency>
```
#### Spring配置
```xml
<bean id="chainDefinitionSource" #<1>
      class="cn.bgonline.wap.simpleapp.account.security.ChainDefinitionSource">
    <property name="filterChain">  #<2>
        <value>
            /logout = logout
            /login.html = anon
            /unauthorized.html = anon
            /404.html = anon
            /500.html = anon
            /favicon.ico = anon
            /** = authc
        </value>
    </property>
</bean>
```
<1> id是固定写法，shiro启动会读取其默认配置
<2> 一些默认的shiro权限配置

#### 权限接口配置
```text
jdbcAuthenticationRealm.authorizationRealm.bean_ref=xxx #<1>
```
<1> 基于属性覆盖的Bean属性赋值，值是一个Bean的引用。实现一个读取用户权限的接口。   `cn.bgonline.askit.module.base.shiro.realm.IAuthorizingRealm`

### Shiro权限配置说明
rest::
例子:  `/admins/user/**=rest[user]` ,根据请求的方法 +
相当于 `/admins/user/**=perms[user:method]` , 其中method为post，get，delete等。

port::
例子:  `/admins/user/**=port[8081]`  +
当请求的url的端口不是8081是跳转到 `schemal://serverName:8081?queryString` ,其中schmal是协议http或https等，serverName是你访问的host,8081是url配置里port的端口，queryString是你访问的url里的？后面的参数。

perms::
例子:  `/admins/user/**=perms[user:add:*]` ,perms参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，例如 `/admins/user/**=perms["user:add:*,user:modify:*"]` ，当有多个参数时必须每个参数都通过才通过，想当于isPermitedAll()方法。

roles::
例子:  `/admins/user/**=roles[admin]` ,参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，当有多个参数时，例如 `/admins/user/**=roles["admin,guest"]` ,每个参数通过才算通过，相当于hasAllRoles()方法。

anon::
例子:  `/admins/**=anon`  没有参数，表示可以匿名使用。

authc::
例如:  `/admins/user/**=authc` 表示需要认证才能使用，没有参数

authcBasic:: 
例如:  `/admins/user/**=authcBasic` 没有参数表示httpBasic认证
ssl::
例子:  `/admins/user/**=ssl` 没有参数，表示安全的url请求，协议为https

user::
例如:  `/admins/user/**=user` 没有参数表示必须存在用户，当登入操作时不做检查
 
[TIP]
====
这些过滤器分为两组，一组是认证过滤器，一组是授权过滤器。 +
其中anon，authcBasic，auchc，user是第一组，perms，roles，ssl，rest，port是第二组
====
 

### 相关参考

Shiro过滤器的定义： http://shiro.apache.org/web.html#Web-DefaultFilters
