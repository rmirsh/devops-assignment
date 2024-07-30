export const parentNav = {
  hidden: { y: "-100%" },
  show: {
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 7,
      delayChildren: 2,
      staggerChildren: 0.3,
    },
  },
  exit: { opacity: 1, transition: { ease: "easeIn" } },
};

export const leftAnimation = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.4,
      type: "spring",
      damping: 20

    }
  }
}

export const downAnimation = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 7
    }
  }
}

export const animationFooter = {
  hidden: {
    y: "15%",
    width: "93%"
  },
  visible: {
    y: "0%",
    width: "100%"
  }
}
export const cookiesAnimation = {
  hidden: { y: "200%", },
  visible: { y: "0%", }
}
export const animation = {
  hidden: {
    y: '10%'
  },
  visible: {
    y: '0%'
  }
}

export const plusesAnimation = {
  hidden: { x: "20%", opacity: 0},
  visible:{x: "0%", opacity: 1}
}


export const animationDir = {
  hidden: {

    y: "10%"
  },
  visible: {
    y: "0%"
  }
}
export const animationDirReversed = {
  hidden: {
    y: '-10%',

  },
  visible: {
    y: '0%',
  }
}
export const hrAnimation = {
  hidden: {
    width: "1%",

  },
  visible: {
    width: "100%",
  }
}