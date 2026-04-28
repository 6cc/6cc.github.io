// inspired by @alvarotrigo https://codepen.io/alvarotrigo/pen/mdXPawB
function createStyles() {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --bgColor: #0fddaf;
      --txtColor: #ffffff;
      --borColor: rgba(0, 0, 0, 0);
      --sizeVar: 8px;
      --textPrimary: #4b4760;
      --textSecondary: #7f7989;
      --borderColor: #cccccc;
    }
    
    body {
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-size: calc(var(--sizeVar) * 1.75);
    }
    
    .flexDiv {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: fit-content;
      margin: 32px;
      position: fixed;
      right: 0;
      bottom: 0;
    }
    
    .selectWrapper {
      width: calc(var(--sizeVar) * 20);
      position: relative;
      opacity: 0;
      pointer-events: none;
      transition: opacity 100ms linear 0s;
      filter: drop-shadow(0 6px 26px rgba(0, 0, 0, 0.24));
      padding-top: calc(var(--sizeVar) / 2);
      bottom: calc(var(--sizeVar) * 4.5);
    }
    
    .multiSelect {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      border: 1px solid var(--borderColor);
      box-sizing: border-box;
      border-radius: calc(var(--sizeVar) / 2);
      position: absolute;
      width: auto;
      left: 0;
      right: 0;
      overflow: hidden;
      background: #ffffff;
      transition: transform 300ms ease-in-out 0s, clip-path 300ms ease-in-out 0s;
      bottom: 100%;
    }
    
    .multiSelect div {
      color: var(--textPrimary);
      padding: 16px;
      width: auto;
      cursor: pointer;
    }
    
    .multiSelect div:hover {
      background-color: #f6f6f6;
    }
    
    .bottomBorder {
      border-bottom: 1px solid var(--borderColor);
    }
    
    .topBorder {
      border-top: 1px solid var(--borderColor);
    }
    
    .iconDiv {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .noSpace {
      justify-content: flex-start;
      gap: 6px;
    }
    
    .titleDiv {
      pointer-events: none;
      font-weight: 700;
    }
    
    .justHover i {
      opacity: 0;
    }
    
    .justHover:hover i {
      opacity: 1;
    }
    
    .multiSelect .placeholder {
      color: var(--textSecondary);
      font-style: italic;
    }
    
    .multiSelect .narrow {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    
    .multiSelect i {
      color: var(--textSecondary);
    }
    
    .multiSelect {
      transform: translateX(100%);
      clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
    }
    
    .multiSelect:nth-of-type(1) {
      transform: translateX(0);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
    
    .sec_btn {
      --bgColor: #869cff;
      width: calc(var(--sizeVar) * 4);
      height: calc(var(--sizeVar) * 4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: calc(var(--sizeVar) * 3);
    }
    
    button {
      font-family: "Roboto", sans-serif;
      font-size: calc(var(--sizeVar) * 1.75);
      font-weight: 500;
      border: none;
      outline: none;
      padding: var(--sizeVar) calc(var(--sizeVar) * 2);
      border-radius: calc(var(--sizeVar) / 2);
      cursor: pointer;
      background-color: var(--bgColor);
      color: var(--txtColor);
      box-shadow: 0 0 0 1px var(--borColor) inset;
    }
    
    button:focus {
      --borColor: rgba(0, 0, 0, 0.4);
    }
    
    button:hover {
      --bgColor: #1fcc9e;
    }
    
    .sec_btn:hover {
      --bgColor: #6279e7;
    }
    
    .tri_btn:hover {
      --bgColor: #f8f7f8;
    }
    
    button:active {
      --bgColor: #1db284;
    }
    
    .sec_btn:active {
      --bgColor: #5468c7;
    }
    
    .tri_btn:active {
      --bgColor: #e7e7e7;
    }
  `;
  document.head.appendChild(style);
}

// 解析数据函数
function parseAdvanced(text) {     
  const lines = text.split('\n').filter(line => line.trim());          
  
  function getIndentLevel(line) {       
    const match = line.match(/^(\s*)-/);       
    return match ? Math.floor(match[1].length / 2) : 0;     
  }          
  
  function parseLineContent(line) {       
    const trimmed = line.trim();       
    let content = trimmed.replace(/^-\s*/, '');              
    const paramMatch = content.match(/#\?<([^#]*)/);       
    let text = content;       
    const attributes = {};              
    
    if (paramMatch) {         
      const paramString = paramMatch[1];         
      text = content.split('#?<')[0].trim();                  
      const pairs = paramString.split('&');                  
      pairs.forEach(pair => {           
        pair = pair.trim();           
        if (pair) {             
          const [key, value] = pair.split('=');             
          if (key) {               
            attributes[key.trim()] = value ? value.trim() : '';             
          }           
        }         
      });                  
      const afterParams = content.substring(paramMatch.index + paramMatch[0].length);         
      const tagMatch = afterParams.match(/#(\w+AML)/);         
      if (tagMatch && attributes['comment'] !== undefined) {           
        attributes['comment'] = (attributes['comment'] || '') + ' #' + tagMatch[1];         
      }       
    }              
    
    return {         
      text,         
      attributes       
    };     
  }          
  
  // 构建树形结构     
  const root = { level: -1, children: [] };     
  const stack = [root];          
  
  lines.forEach(line => {       
    const level = getIndentLevel(line);       
    const parsed = parseLineContent(line);              
    
    const node = {         
      level,         
      text: parsed.text,         
      ...parsed.attributes,         
      children: []       
    };              
    
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {         
      stack.pop();       
    }              
    
    stack[stack.length - 1].children.push(node);       
    stack.push(node);     
  });          
  
  return root.children;   
}

// 功能函数
function openMulti() {
  const selectWrapper = document.querySelector(".selectWrapper");
  if (selectWrapper.style.pointerEvents === "all") {
    selectWrapper.style.opacity = "0";
    selectWrapper.style.pointerEvents = "none";
    resetAllMenus();
  } else {
    selectWrapper.style.opacity = "1";
    selectWrapper.style.pointerEvents = "all";
  }
}

function nextMenu(e) {
  const menuIndex = parseInt(e.target.parentNode.id.slice(-1));
  const multiSelects = document.querySelectorAll(".multiSelect");
  
  multiSelects[menuIndex].style.transform = "translateX(-100%)";
  multiSelects[menuIndex].style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
  multiSelects[menuIndex + 1].style.transform = "translateX(0)";
  multiSelects[menuIndex + 1].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
}

function prevMenu(e) {
  const menuIndex = parseInt(e.target.parentNode.id.slice(-1));
  const multiSelects = document.querySelectorAll(".multiSelect");
  
  multiSelects[menuIndex].style.transform = "translateX(100%)";
  multiSelects[menuIndex].style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
  multiSelects[menuIndex - 1].style.transform = "translateX(0)";
  multiSelects[menuIndex - 1].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
}

function resetAllMenus() {
  setTimeout(function () {
    const multiSelects = document.querySelectorAll(".multiSelect");
    for (let i = 1; i < multiSelects.length; i++) {
      multiSelects[i].style.transform = "translateX(100%)";
      multiSelects[i].style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
    }
    multiSelects[0].style.transform = "translateX(0)";
    multiSelects[0].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
  }, 300);
}

// 判断是否为节点（包含"折叠"） 或 功能键（包含"功能"）
// 判断节点类型的算法函数
function classifyNodeType(node) {
  const hasChildren = node.children && node.children.length > 0;
  
  return {
      isNode: hasChildren,      // 有子节点 = 节点
      isLeaf: !hasChildren,     // 无子节点 = 末端
      childCount: node.children ? node.children.length : 0
  };
}

// 遍历树并标记所有节点
function markNodeTypes(nodeArray) {
  return nodeArray.map(node => ({
      ...node,
      nodeType: classifyNodeType(node),
      children: node.children ? markNodeTypes(node.children) : []
  }));
}

// 获取节点深度
function getNodeDepth(node, depth = 0) {
  if (!node.children || node.children.length === 0) {
      return depth;
  }
  return Math.max(...node.children.map(child => getNodeDepth(child, depth + 1)));
}

// 统计树的统计信息
function getTreeStats(nodeArray) {
  let totalNodes = 0;
  let leafNodes = 0;
  let maxDepth = 0;
  
  function traverse(nodes, depth = 0) {
      maxDepth = Math.max(maxDepth, depth);
      
      nodes.forEach(node => {
          totalNodes++;
          const classification = classifyNodeType(node);
          
          if (classification.isLeaf) {
              leafNodes++;
          }
          
          if (node.children) {
              traverse(node.children, depth + 1);
          }
      });
  }
  
  traverse(nodeArray);
  
  return {
      totalNodes,
      leafNodes,
      branchNodes: totalNodes - leafNodes,
      maxDepth
  };
}

// ========== 命令函数映射 ==========
const commandFunctions = {
  '层一功能1': function() {
    console.log('执行: 层一功能1');
  },

  '层二折叠1': function() {
    console.log('执行: 层二折叠1');
   },
   
  '层三功能1': function() {
    console.log('执行: 层三功能1');
  },

  '层三功能2': function() {
    console.log('执行: 层三功能2');
  },

  '层二功能1': function() {
    console.log('执行: 层二功能1');
  },
  
  '层一功能2': function() {
    console.log('执行: 层一功能2');
  }
};
  
// 执行命令的包装函数
function executeCommand(featureName) {
  if (commandFunctions[featureName]) {
    commandFunctions[featureName]();
  } else {
    console.warn(`未找到命令: ${featureName}`);
  }
}

// 改进：基于节点类型而非文字内容
function createMenuItemsFromData(nodeArray, menuLevel) {
  const items = [];
  
  nodeArray.forEach((node, index) => {
      const { isNode, isLeaf } = classifyNodeType(node);
      
      if (isNode) {
          // 有子节点 - 创建可导航项
          const div = document.createElement("div");
          div.className = "iconDiv justHover";
          div.dataset.nodeType = "branch";
          div.dataset.depth = menuLevel;
          
          if (index < nodeArray.length - 1) {
              div.classList.add("bottomBorder");
          }
          
          div.id = `menu-${menuLevel}-nav`;
          div.onclick = nextMenu;
          div.innerHTML = `${node.text}<i class="material-icons">arrow_right</i>`;
          items.push(div);
          
      } else if (isLeaf) {
          // 末端节点 - 创建功能项
          const div = document.createElement("div");
          div.className = "narrow";
          div.dataset.nodeType = "leaf";
          div.dataset.depth = menuLevel;
          
          if (index < nodeArray.length - 1) {
              div.classList.add("bottomBorder");
          }
          
          div.textContent = node.text;
          // 绑定命令执行函数
          div.onclick = function() {
            executeCommand(node.text);
            openMulti();
          };
          items.push(div);
      }
  });
  
  return items;
}

// 改进：递归创建菜单
function createMenusFromData(dataArray, selectWrapper, menuLevel = 0) {
  dataArray.forEach((node) => {
      const { isNode } = classifyNodeType(node);
      
      // 只为有子节点的项创建子菜单
      if (isNode && node.children && node.children.length > 0) {
          const menu = document.createElement("div");
          menu.className = "multiSelect";
          menu.id = `menu-${menuLevel + 1}`;
          menu.dataset.level = menuLevel + 1;
          
          // 添加标题
          const titleDiv = document.createElement("div");
          titleDiv.className = "bottomBorder titleDiv";
          titleDiv.textContent = node.text;
          titleDiv.dataset.nodeType = "branch-title";
          menu.appendChild(titleDiv);
          
          // 添加子项
          const items = createMenuItemsFromData(node.children, menuLevel + 1);
          items.forEach(item => menu.appendChild(item));
          
          // 添加返回按钮
          const backDiv = document.createElement("div");
          backDiv.className = "topBorder iconDiv noSpace";
          backDiv.id = `menu-${menuLevel}`;
          backDiv.dataset.action = "back";
          backDiv.onclick = prevMenu;
          backDiv.innerHTML = '<i class="material-icons">arrow_back</i>Back';
          menu.appendChild(backDiv);
          
          selectWrapper.appendChild(menu);
          
          // 递归处理子节点
          createMenusFromData(node.children, selectWrapper, menuLevel + 1);
      }
  });
}

// 创建DOM元素 
function createMultiSelectUI(treeData) {   
  // 创建主容器   
  const flexDiv = document.createElement("div");   
  flexDiv.className = "flexDiv";    
  
  // 创建按钮   
  const button = document.createElement("button");   
  button.className = "sec_btn";   
  button.textContent = "≡";   
  button.onclick = openMulti;   
  flexDiv.appendChild(button);    
  
  // 创建选择器包装   
  const selectWrapper = document.createElement("div");   
  selectWrapper.className = "selectWrapper";    
  
  // 创建根菜单
  const rootMenu = document.createElement("div");
  rootMenu.className = "multiSelect";
  rootMenu.id = "menu-0";

  // 添加根菜单项
  const rootItems = createMenuItemsFromData(treeData, 0);
  rootItems.forEach(item => rootMenu.appendChild(item));

  selectWrapper.appendChild(rootMenu);

  // 递归创建子菜单
  createMenusFromData(treeData, selectWrapper, 0);
  
  flexDiv.appendChild(selectWrapper);    
  
  return flexDiv; 
}  

// 初始化 
document.addEventListener("DOMContentLoaded", function () {
  createStyles();
  
  const data = `
- 层一功能1
- 层一折叠1
  - 层二折叠1
    - 层三功能1
    - 层三功能2
  - 层二功能1
- 层一功能2 #?<comment= #YggdrAML
`;
  
  // 解析数据
  let result = parseAdvanced(data);
  
  // 标记节点类型
  result = markNodeTypes(result);
  
  // 获取统计信息
  const stats = getTreeStats(result);
  console.log('树统计信息:', stats);
  console.log('完整标记结果:', JSON.stringify(result, null, 2));
  
  // 创建UI
  const ui = createMultiSelectUI(result);
  document.body.appendChild(ui);
});
