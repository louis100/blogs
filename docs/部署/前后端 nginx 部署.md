# 前后端 nginx 部署

以下是为 uniapp 打包 H5 项目配置 Nginx 的完整指南：

## 一、uniapp 打包配置步骤

1. manifest.json 配置

```json
"h5": {
  "router": {
    "mode": "hash",  // 必须使用hash模式
    "base": "./"     // 根据部署路径调整
  },
  "publicPath": "/", // 静态资源基础路径
  "devServer": {     // 仅开发环境使用
    "proxy": {
      "/api": {
        "target": "http://your-backend.com",
        "changeOrigin": true
      }
    }
  }
}
```

打包命令

```bash
npm run build:h5
```

生成文件位于 `/dist/build/h5` 目录

## 二、Nginx 部署配置（示例）

```nginx
server {
    listen       80;
    server_name  yourdomain.com;

    # 静态文件配置
    location / {
        root   /www/h5-project;  # 打包文件存放路径
        index  index.html index.htm;

        # 解决vue-router的history模式404问题
        try_files $uri $uri/ /index.html;
    }

    # API代理配置（解决跨域）
    location /api/ {
        proxy_pass http://backend-server:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 可选：CORS配置
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    }

    # 开启gzip压缩
    gzip on;
    gzip_types text/plain application/xml application/javascript text/css application/json;
}
```

## 三、关键注意事项

### 路由模式

1. 必须使用 hash 模式（URL 带#号）
2. 若需 history 模式，需额外配置：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 跨域处理

- 优先使用 Nginx 代理而非前端配置
- 生产环境建议指定具体域名代替\*：

```nginx
add_header 'Access-Control-Allow-Origin' 'https://your-domain.com';
```

### HTTPS 配置

```nginx
listen 443 ssl;
ssl_certificate /path/to/cert.pem;
ssl_certificate_key /path/to/privkey.pem;
```

## 四、部署流程

1. 将打包文件上传至服务器目录（如：/www/h5-project）
2. 检查 nginx 配置：`nginx -t`
3. 重载配置：`nginx -s reload`

## 常见问题排查

1. 页面空白问题
   - 检查 publicPath 是否设置为`./`
   - 确认资源路径是否正确（Chrome 开发者工具 Network 面板）
2. 接口 404 错误
   - 确认代理路径是否匹配（如：/api/ -> backend-server/api/）
   - 使用 curl 测试后端接口可达性
3. 字体/图标加载失败

```nginx
location ~* \.(eot|ttf|woff|woff2|svg)$ {
    add_header Access-Control-Allow-Origin *;
}
```
