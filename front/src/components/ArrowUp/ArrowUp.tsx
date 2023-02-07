import style from './style.module.css'
import arrow from './../../assets/back.svg'

export const ArrowUp = () => {
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className={style.arrowWrapper}>
      <div className={style.arrowBackground} onClick={handleScrollUp}>
        <img
          className={style.arrow}
          src={arrow}
          alt="Scroll up"
          height="29px"
        />
      </div>
    </div>
  )
}
