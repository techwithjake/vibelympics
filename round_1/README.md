# Challenge 1

I'm going to have to drop out. Couldn't find the time to work with an AI to create something as I was working 14 hour days on a project for work.

Thanks for the chance and good luck to all contestants!

Give the winner double swag!


# 🔢 Emoji Calculator

Web-based calculator using **only emojis** - no text! Built with Chainguard secure containers. [web:15][web:26]

![Screenshot](screenshot.png)
*📱 Mobile-friendly • 🔒 0 CVEs • 🚀 ~120MB*

## ✨ Features
- 0️⃣-9️⃣ All numbers
- ➕ ➖ ❌ 🔽 All operations
- ✅ Equals
- 🔄 Clear
- 🎨 Responsive design

## 🏗️ Build

`docker build -t emoji-calc .`


## 🚀 Run

`docker run -d -p 8080:8080 --name calc emoji-calc`


🔗 **Open:** http://localhost:8080

## 🛠️ Files
- `Dockerfile` - Chainguard Node.js multi-stage [web:12]
- `package.json` - Express dependency
- `index.js` - 100% emoji UI + calculator logic

## 🔒 Security
✅ **Chainguard Images**: 0 CVEs, minimal attack surface [web:6]  
✅ Non-root user (65532)  
✅ Production Node.js runtime  

## 📊 Stats
| Metric | Value |
|--------|-------|
| Image Size | ~120MB |
| CVEs | 0 |
| Base | cgr.dev/chainguard/node |
| Port | 8080 |

## 🤝 Credits
Built for open source lovers using Chainguard containers [memory]

## 📄 License
MIT
