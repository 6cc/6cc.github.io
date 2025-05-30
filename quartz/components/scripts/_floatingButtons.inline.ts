// original source: 2/2/25
// https://github.com/CatCodeMe/catcodeme.github.io/blob/770f3f8d1f6849ef40bc06b4300a52b3aecfb551/quartz/components/scripts/floatingButtons.inline.ts
import { navigateToRandomPage } from "./_randomPage.inline";

// 全局变量跟踪状态
// let activeModal: HTMLElement | null = null
let currentCleanup: (() => void) | null = null

function setupFloatingButtons() {
  // 清理之前的设置
  if (currentCleanup) {
    currentCleanup()
    currentCleanup = null
  }

  const buttonGroups = document.querySelectorAll<HTMLElement>('.button-group')
// CODE FOR SETTING UP THE SHORTCUT SHEET
  // 显示快捷键列表
//   function showShortcutSheet() {
//     if (activeModal) return

//     const modal = document.createElement('div')
//     activeModal = modal
//     modal.className = 'shortcut-sheet-modal'
    
//     const content = document.createElement('div')
//     content.className = 'shortcut-sheet-content'
    
//     content.innerHTML = `
//       <h3>键盘快捷键</h3>
//       <div class="shortcut-list">
//         <div class="shortcut-item" data-shortcut="search">
//           <span class="shortcut-keys">
//             <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> + <kbd class="retro-key">K</kbd>
//           </span>
//           <span class="shortcut-desc">搜索</span>
//         </div>
//         <div class="shortcut-item" data-shortcut="graph">
//           <span class="shortcut-keys">
//             <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> + <kbd class="retro-key">G</kbd>
//           </span>
//           <span class="shortcut-desc">全局图谱</span>
//         </div>
//         <div class="shortcut-item" data-shortcut="reader">
//           <span class="shortcut-keys">
//             <kbd class="retro-key">⌘</kbd> / <kbd class="retro-key">Ctrl</kbd> + <kbd class="retro-key">E</kbd>
//           </span>
//           <span class="shortcut-desc">阅读模式</span>
//         </div>
//       </div>
//     `
    
//     const closeBtn = document.createElement('button')
//     closeBtn.className = 'shortcut-sheet-close'
//     closeBtn.innerHTML = '×'
    
//     content.insertBefore(closeBtn, content.firstChild)
//     modal.appendChild(content)

//     // 统一的关闭函数
//     function closeModal(executeAction?: string) {
//       if (!activeModal) return
      
//       document.removeEventListener('keydown', handleEsc)
//       modal.removeEventListener('mousedown', handleOutsideClick)
//       closeBtn.removeEventListener('click', handleButtonClick)
//       content.removeEventListener('click', handleShortcutClick)
      
//       activeModal.remove()
//       activeModal = null

//       // 如果指定了动作，则执行
//       if (executeAction) {
//         switch (executeAction) {
//           case 'search':
//             // 触发搜索快捷键
//             const searchEvent = new KeyboardEvent('keydown', {
//               key: 'k',
//               ctrlKey: true,
//               metaKey: true
//             })
//             document.dispatchEvent(searchEvent)
//             break
//           case 'graph':
//             toggleGraph()
//             break
//           case 'reader':
//             // 触发阅读模式快捷键
//             const readerEvent = new KeyboardEvent('keydown', {
//               key: 'e',
//               ctrlKey: true,
//               metaKey: true
//             })
//             document.dispatchEvent(readerEvent)
//             break
//         }
//       }
//     }

//     // 处理 ESC 关闭
//     function handleEsc(e: KeyboardEvent) {
//       if (e.key === 'Escape') {
//         closeModal()
//       }
//     }

//     // 处理点击外部关闭
//     function handleOutsideClick(e: MouseEvent) {
//       // 确保点击的是模态框背景而不是内容
//       if (e.target === modal && e.currentTarget === modal) {
//         e.preventDefault()
//         e.stopPropagation()
//         closeModal()
//       }
//     }

//     // 处理关闭按钮点击
//     function handleButtonClick(e: MouseEvent) {
//       e.preventDefault()
//       e.stopPropagation()
//       closeModal()
//     }

//     // 处理快捷键项点击
//     function handleShortcutClick(e: MouseEvent) {
//       const shortcutItem = (e.target as Element).closest('.shortcut-item')
//       if (!shortcutItem) return

//       const action = shortcutItem.getAttribute('data-shortcut')
//       if (action) {
//         closeModal(action)
//       }
//     }

//     document.addEventListener('keydown', handleEsc)
//     modal.addEventListener('mousedown', handleOutsideClick)
//     closeBtn.addEventListener('click', handleButtonClick)
//     content.addEventListener('click', handleShortcutClick)

//     document.body.appendChild(modal)
//   }



  // 处理图谱显示
    // Turns out, this only works if you already have the graph on the page. So you can't use this as a full replacement for the graph component.
    // potential workaround: create a hidden graph component that's hidden on everything?
    // So you would want the little graph to be always hidden, but the large graph modal would need to be visible despite that, when called on. 
  function toggleGraph() {
    const graphComponent = document.querySelector('.graph') as HTMLElement
    if (!graphComponent) return

    const isVisible = graphComponent.classList.contains('active')
    if (!isVisible) {
      // 显示图谱
      graphComponent.classList.add('active')
      // 触发图谱渲染
      const globalGraphIcons = document.getElementsByClassName('global-graph-icon');
      if (globalGraphIcons.length > 0) {
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        globalGraphIcons[0].dispatchEvent(clickEvent);
      }


      // 注册 ESC 关闭事件
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          graphComponent.classList.remove('active')
          document.removeEventListener('keydown', handleEsc)
        }
      }
      document.addEventListener('keydown', handleEsc)
    } else {
      // 隐藏图谱
      graphComponent.classList.remove('active')
    }
  }

  // 处理按钮点击
  function handleButtonClick(e: Event) {
    const button = (e.target as Element).closest('[data-action]')
    if (!button) return
    
    const action = (button as Element).getAttribute('data-action')
    const center = document.querySelector('.center')
    const footer = document.querySelector('.footer')

    if (!center) return
    if (!footer) return

    switch (action) {
      case 'scrollTop':
        // const firstElement = center.firstElementChild
        // if (firstElement) {
        //   firstElement.scrollIntoView({ behavior: 'smooth' })
        // }
        globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        break
      case 'scrollBottom':
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' })
        }
        // const lastElement = center.lastElementChild
        // if (lastElement) {
        //     lastElement.scrollIntoView({ behavior: 'smooth' })
        // }
        break
      case 'graph':
        toggleGraph()
        break
    //   case 'shortcuts':
    //     showShortcutSheet()
    //     break
      case 'randomPgFloating':
        navigateToRandomPage()
        break
    }
  }

  // 设置事件监听
  buttonGroups.forEach(group => {
    group.addEventListener('click', handleButtonClick)
  })

  // 保存当前的清理函数
  currentCleanup = () => {
    buttonGroups.forEach(group => {
      group.removeEventListener('click', handleButtonClick)
    })
    // if (activeModal) {
    //   activeModal.remove()
    //   activeModal = null
    // }
  }
}

// 页面加载和导航时初始化
document.addEventListener('DOMContentLoaded', setupFloatingButtons)
document.addEventListener('nav', setupFloatingButtons)

// Adding in the "prevent default" behavior here but this is actually for broken links
document.querySelectorAll('.broken-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the link from navigating
  });
});
