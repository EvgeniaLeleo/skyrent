import { Link } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import style from './style.module.css'

export const MainPage = () => {
  return (
    <PageWrapper>
      <div className={style.nav}>
        <Link to={ROUTES.main}>
          <img
            className={style.logo}
            src="./assets/images/logo.svg"
            alt="skyrent-logo"
          />
        </Link>
        <Link to={ROUTES.main} className={style.navLink}>
          <div>О проекте</div>
        </Link>
      </div>
      <h1 className={style.title}>Пора переезжать?</h1>
      <h2 className={style.subtitle}>
        Находите места для жизни и работы по всему миру
      </h2>
      <Button onClick={() => {}} mb="41px">
        Подобрать недвижимость
      </Button>
    </PageWrapper>
  )
}
