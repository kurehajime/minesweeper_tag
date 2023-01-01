# MineSweeper Tag
[![npm version](https://badge.fury.io/js/mine-sweeper-tag.svg)](https://badge.fury.io/js/mine-sweeper-tag)

Minesweeper for Web Components

![MineSweeper](https://user-images.githubusercontent.com/4569916/210158769-7d3e975e-a5bb-46be-a581-10271682ead2.gif)

## Usage

install

```
npm install mine-sweeper-tag
```

Define custom element.

```
import { mine_sweeper } from 'mine-sweeper-tag'
customElements.define('mine-sweeper', mine_sweeper)
```

Insert tag.

```
<mine-sweeper cols="10" bomb="10" />
```
