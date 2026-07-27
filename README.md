# CS2 Friberg 猜选手助手

油猴脚本，辅助 [shnlfriberg.online](https://shnlfriberg.online) 网站的 CS2 职业选手猜谜游戏。根据每次猜测的反馈自动过滤候选选手，并用信息论算法推荐最佳下一猜。

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 打开 Tampermonkey 管理面板 → **添加新脚本**
3. 将 `cs2-helper.user.js` 的全部内容粘贴进去，保存
4. 访问游戏页面，右侧自动出现助手面板

## 支持模式

| 模式 | URL | 检测方式 |
|------|-----|---------|
| 单人 | `/single/easy` `/single/normal` | 拦截 XHR 请求 |
| 多人 | `/multi/room` | MutationObserver 监听自己棋盘 |
| 手动推演 | 任意页面 | 面板内手动输入 |

## 功能

### 自动过滤

每次猜测后，根据 8 项反馈属性自动筛选候选：

| 属性 | 绿色 (correct) | 黄色 (close) | 灰色 (wrong) |
|------|:--:|:--:|:--:|
| 国籍 | 精确匹配 | 同赛区不同国家 | 不同赛区 |
| 队伍 | 精确匹配 | — | 不匹配 |
| 年龄 | 精确匹配 | ±3 岁 | >3 岁 + 方向箭头 |
| 位置 | 精确匹配 | — | 不匹配 |
| Major 冠军 | 精确匹配 | ±1 | >1 + 方向箭头 |
| Major 出场 | 精确匹配 | ±1 | >1 + 方向箭头 |
| 在役状态 | 精确匹配 | — | 不匹配 |

过滤参数与服务器端 `gameService.ts` 完全一致。

### 最佳推荐

基于**信息熵**算法，计算每个候选选手作为下一次猜测的期望剩余候选数，推荐得分最高的 6 个。得分越低的选手越能快速缩小范围。

### 手动推演

面板底部"手动推演"区域允许脱离实际游戏进行推演：

1. 展开面板，输入选手名称
2. 为每个属性设置反馈级别（C 正确 / ~ 接近 / X 错误）
3. 数值属性可设置方向箭头（▲更高 / ▼更低）
4. 点击"添加猜测"将推测加入历史

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+H` | 折叠/展开面板 |
| `Ctrl+Shift+1~5` | 快速选择第 N 个推荐 |

### 其他

- 面板可拖拽移动
- 猜测记录可单独删除，候选自动重算
- 底部浮动推荐条（适合小屏幕）
- 支持单人/多人模式自动切换

## 数据库

内置 646 名 CS2 职业选手数据，来源于 `https://github.com/shnlfriberg/csgo-major-db`，包含昵称、国籍、赛区、队伍、年龄、位置、Major 冠军/出场次数、在役状态。

> 如需更新选手数据，修改 `players.json` 后运行：
> ```bash
> node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('players.json','utf8'));const c=p.map(x=>[x.nickname,x.nationality,x.region,x.team,x.age,x.role,x.major_championships,x.major_appearances,x.is_active]);fs.writeFileSync('players_compact.json',JSON.stringify(c))"
> ```
> 然后将生成的 `players_compact.json` 内容替换脚本中 `RAW_PLAYERS = ` 后的数组。
