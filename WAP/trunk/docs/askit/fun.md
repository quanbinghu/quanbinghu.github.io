## 公用组件使用

### 验证码

.Spring配置集成
====
```xml
<bean id="captcha" class="cn.bgonline.askit.module.base.captcha.spring.PatchcaFactoryBean"/>
```

更多配置请参考 Spring配置
====

.Java Controller 代码
====
```java

@Autowired
ConfigurableCaptchaService cs; #<1>

@RequestMapping("/pcrimg")  #<2>
public void crimg(HttpServletRequest request, HttpServletResponse response) throws IOException {
	HttpSession session = request.getSession(true);
	setResponseHeaders(response);
	String token = EncoderHelper.getChallangeAndWriteImage(cs, "png", response.getOutputStream());
	session.setAttribute("captchaToken", token);
	System.out.println("当前的SessionID=" + session.getId() + "，验证码=" + token);
}

#<3>
protected void setResponseHeaders(HttpServletResponse response) {
	response.setContentType("image/png");
	response.setHeader("Cache-Control", "no-cache, no-store");
	response.setHeader("Pragma", "no-cache");
	long time = System.currentTimeMillis();
	response.setDateHeader("Last-Modified", time);
	response.setDateHeader("Date", time);
	response.setDateHeader("Expires", time);
}
```

<1> 注入验证码生成配置
<2> 验证码URL指定
<3> 设置输出头信息
====


### 系统监控使用及配置

#### POM引用
```xml
<dependency>
    <groupId>cn.bgonline.askit.modules</groupId>
    <artifactId>askit-monitor</artifactId>
    <version>${askit.version}</version>
</dependency>
```

#### WEB.XML开启Spring profile
```xml
<context-param>
    <param-name>spring.profiles.default</param-name>
    <param-value>monitor-datasource,monitor-http</param-value> #<1>
</context-param>
```
<1> `monitor-datasource` 数据源日志控制，有SQL查询和连接打开关闭的日志，`monitor-http` HTTP请求的日志记录

#### 日志输出配置

.`logback.xml` 配置监控日志输出
====
```xml
    <property name="HTTP-LOG-TIMING" value="0" scope="CONTEXT"/> #<1>
    <property name="METHOD-LOG-TIMING" value="0" scope="CONTEXT"/> #<2>

    <logger name="HTTP-LOG" level="TRACE" />  #<3>
    <logger name="DATASOURCE-LOG" level="TRACE" />  #<4>
```
<1> `HTTP-LOG-TIMING` HTTP日志记录的时间限制，超过多少毫秒的请求被记录。
<2> `METHOD-LOG-TIMING` 数据查询的日志记录时间限制，超过多少毫秒的SQL执行语句被记录。
<3> `HTTP-LOG` HTTP日志记录的日志名称，可配置日志记录方式等
<4> `DATASOURCE-LOG` 数据源查询日志记录的日志名称，可配置日志记录方式等
====

### 数据缓存使用及配置

_TODO_

### 集合和字符处理使用实例指导
_TODO_


### Zookeeper使用及配置

#### 配置：
. 在web.xml中启用Spring profile： zookeeper
. 通过Bean属性覆盖的方式设置链接字符串，如 `zookeeperFactory.connectionString = hadoopmaster:2181`

#### 使用：
. 注入 `@Autowired private CuratorFramework zkClient;`
.  `byteData = zkClient.getData().forPath('/path'); SerializationUtils.deserialize(byteData); `
. 参考： https://curator.apache.org/
