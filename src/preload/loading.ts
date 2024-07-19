export function useLoading() {
  const loadingIdName = 'appLoading'
  const styleContent = `
    #${loadingIdName} {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1996;
      width: 100%;
      height: 100%;
      font-size: 20px;
      background: rgba(255, 255, 255, 1);
    }

    #${loadingIdName}.removeAnimate {
      animation: removeAnimate 0.3s 0.5s 1 both;
    }

    #${loadingIdName} .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5em;
      height: 5em;
      transform: translate(-50%, -50%) rotate(165deg);
    }

    #${loadingIdName} .loader::before,
    #${loadingIdName} .loader::after {
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

    #${loadingIdName} .loader::before {
      animation: before 2s infinite;
    }

    #${loadingIdName} .loader::after {
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

  loadingDiv.id = `${loadingIdName}`
  loadingDiv.innerHTML = `
    <div class="loader"></div>
`
  const safe = {
    append(parent: HTMLElement, child: HTMLElement) {
      if (!Array.from(parent.children).find((e) => e === child)) {
        // console.log('append child', child)
        return parent.appendChild(child)
      }
      return null
    },
    remove(parent: HTMLElement, child: string) {
      if (Array.from(parent.children).find((e) => e.id === child)) {
        // console.log('remove child', child)
        const childHtml = document.getElementById(child)
        if (childHtml) return parent.removeChild(childHtml)
      }
      return null
    }
  }

  return {
    appendLoading() {
      // console.log('append loading')
      safe.append(document.head, loadingStyle)
      safe.append(document.body, loadingDiv)
    },
    removeLoading() {
      // console.log('remove loading')
      safe.remove(document.head, loadingStyle.id)
      safe.remove(document.body, loadingDiv.id)
    }
  }
}
