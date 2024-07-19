// export function useLoading() {
// }

// const className = `loaders-css__square`
// const styleContent = `
// @keyframes square {
//   0% { transform: rotate(0deg); }
//   50% { transform: rotate(180deg); }
//   100% { transform: rotate(360deg); }
// }
// .${className} {
//   box-sizing: border-box;
//   width: 46px;
//   height: 46px;
//   border: 6px solid #45c58b;
//   border-radius: 50%;
//   -webkit-animation: loading 1.5s linear infinite;
//   animation: square 1.5s linear infinite;
// }
// .${className} > div {
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   left: 40px;
//   top: -5px;
//   position: absolute;
//   background: #fefefe;
// }
// .app-loading-wrap {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: #111111;
//   z-index: 999;
// }
// `

const styleContent = `
    #appLoading {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1996;
      width: 100%;
      height: 100%;
      font-size: 20px;
      background: rgba(255, 255, 255, 1);
    }

    #appLoading.removeAnimate {
      animation: removeAnimate 0.3s 0.5s 1 both;
    }

    #appLoading .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5em;
      height: 5em;
      transform: translate(-50%, -50%) rotate(165deg);
    }

    #appLoading .loader::before,
    #appLoading .loader::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 1em;
      height: 1em;
      border-radius: 0.5em;
      transform: translate(-50%, -50%);
    }

    #appLoading .loader::before {
      animation: before 2s infinite;
    }

    #appLoading .loader::after {
      animation: after 2s infinite;
    }

    @keyframes before {
      0% {
        width: 1em;
        box-shadow: 2em -1em rgba(225, 20, 98, 0.75),
          -2em 1em rgba(111, 202, 220, 0.75);
      }

      35% {
        width: 5em;
        box-shadow: 0 -1em rgba(225, 20, 98, 0.75),
          0 1em rgba(111, 202, 220, 0.75);
      }

      70% {
        width: 1em;
        box-shadow: -2em -1em rgba(225, 20, 98, 0.75),
          2em 1em rgba(111, 202, 220, 0.75);
      }

      100% {
        box-shadow: 2em -1em rgba(225, 20, 98, 0.75),
          -2em 1em rgba(111, 202, 220, 0.75);
      }
    }

    @keyframes after {
      0% {
        height: 1em;
        box-shadow: 1em 2em rgba(61, 184, 143, 0.75),
          -1em -2em rgba(233, 169, 32, 0.75);
      }

      35% {
        height: 5em;
        box-shadow: 1em 0 rgba(61, 184, 143, 0.75),
          -1em 0 rgba(233, 169, 32, 0.75);
      }

      70% {
        height: 1em;
        box-shadow: 1em -2em rgba(61, 184, 143, 0.75),
          -1em 2em rgba(233, 169, 32, 0.75);
      }

      100% {
        box-shadow: 1em 2em rgba(61, 184, 143, 0.75),
          -1em -2em rgba(233, 169, 32, 0.75);
      }
    }

    @keyframes removeAnimate {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  `
const loadingStyle = document.createElement('style')
const loadingDiv = document.createElement('div')

loadingStyle.id = 'apploadingStyle'
loadingStyle.innerHTML = styleContent

// loadingDiv.id = 'appLoading'
// loadingDiv.className = 'app-loading-wrap'
// loadingDiv.innerHTML = `<div class="${className}"><div></div></div>`

loadingDiv.className = 'app-loading-div'
loadingDiv.id = 'appLoading'
loadingDiv.innerHTML = `
    <div class="loader"></div>
`
export const appendLoading = () => {
  console.log('append loading')
  safe.append(document.head, loadingStyle)
  safe.append(document.body, loadingDiv)
}
export const removeLoading = () => {
  console.log('remove loading')
  safe.remove(document.head, loadingStyle.id)
  safe.remove(document.body, loadingDiv.id)
}

const safe = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      console.log('append child', child)
      return parent.appendChild(child)
    } else return parent
  },
  remove(parent: HTMLElement, child: string) {
    // console.log('parent', parent)
    // console.log('child', child)
    if (Array.from(parent.children).find((e) => e.id === child)) {
      console.log('remove child', child)
      const childHtml = document.getElementById(child)
      if (childHtml) return parent.removeChild(childHtml)
      else return parent
    } else return parent
  }
}
