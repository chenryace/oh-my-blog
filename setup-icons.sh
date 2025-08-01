#!/bin/bash

# 图标设置脚本
echo "🎯 开始设置PWA图标..."

# 源图片路径
SOURCE_IMAGE="/Users/qfdk/Pictures/download.png"

# 检查源文件是否存在
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ 错误: 找不到源图片文件 $SOURCE_IMAGE"
    exit 1
fi

# 检查是否安装了ImageMagick
if ! command -v convert &> /dev/null; then
    echo "📦 正在安装ImageMagick..."
    if command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "❌ 请先安装Homebrew或ImageMagick"
        echo "访问: https://brew.sh 安装Homebrew"
        exit 1
    fi
fi

# 创建不同尺寸的图标
echo "🔄 生成图标..."

# Apple Touch Icon (180x180)
convert "$SOURCE_IMAGE" -resize 180x180 -background white -gravity center -extent 180x180 public/apple-touch-icon.png
echo "✅ 创建 apple-touch-icon.png (180x180)"

# PWA Icon 192x192
convert "$SOURCE_IMAGE" -resize 192x192 -background white -gravity center -extent 192x192 public/icon-192x192.png
echo "✅ 创建 icon-192x192.png (192x192)"

# PWA Icon 512x512
convert "$SOURCE_IMAGE" -resize 512x512 -background white -gravity center -extent 512x512 public/icon-512x512.png
echo "✅ 创建 icon-512x512.png (512x512)"

# 创建favicon.ico (多尺寸)
convert "$SOURCE_IMAGE" -resize 16x16 -background white -gravity center -extent 16x16 public/favicon-16.png
convert "$SOURCE_IMAGE" -resize 32x32 -background white -gravity center -extent 32x32 public/favicon-32.png
convert "$SOURCE_IMAGE" -resize 48x48 -background white -gravity center -extent 48x48 public/favicon-48.png
convert public/favicon-16.png public/favicon-32.png public/favicon-48.png public/favicon.ico
rm public/favicon-16.png public/favicon-32.png public/favicon-48.png
echo "✅ 创建 favicon.ico"

echo "🎉 图标设置完成！"
echo ""
echo "📱 iPhone用户使用方法："
echo "1. 在Safari中打开你的博客"
echo "2. 点击分享按钮"
echo "3. 选择'添加到主屏幕'"
echo "4. 确认添加"
echo ""
echo "✨ 图标将显示在iPhone主屏幕上！"