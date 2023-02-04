import { PageWrapper } from '../PageWrapper/PageWrapper'
import { Footer } from '../../components/Footer/Footer'
import { NavBack } from '../../components/NavBack/NavBack'

import style from './style.module.css'
import on from './../../assets/on.svg'

export const AboutPage = () => {
  return (
    <PageWrapper>
      <NavBack />

      <p className={style.description}>
        Skyrent - MVP сервиса доски объявлений по длительной аренде жилья для
        релокации. Позволяет просматривать список, просматривать карточку,
        фильтровать и просматривать контакты арендатора.
      </p>

      <h4 className={style.collaborators}>Над проектом работали:</h4>

      <ul className={style.collaboratorsList}>
        <li className={style.collaborator}>
          <img
            src={on}
            alt=""
            className={style.collaboratorIcon}
            width="17px"
          />
          Frontend&nbsp;
          <a
            href="https://github.com/EvgeniaLeleo"
            target="_blank"
            rel="noreferrer"
            className={style.collaboratorLink}
          >
            @EvgeniaLeleo
          </a>
        </li>
        <li className={style.collaborator}>
          <img
            src={on}
            alt=""
            className={style.collaboratorIcon}
            width="17px"
          />
          Backend&nbsp;
          <a
            href="https://github.com/HAMarat"
            target="_blank"
            rel="noreferrer"
            className={style.collaboratorLink}
          >
            @HAMarat
          </a>
        </li>
        <li className={style.collaborator}>
          <img
            src={on}
            alt=""
            className={style.collaboratorIcon}
            width="17px"
          />
          QA-engineer&nbsp;
          <a
            href="https://github.com/Taygib"
            target="_blank"
            rel="noreferrer"
            className={style.collaboratorLink}
          >
            @Taygib
          </a>
        </li>
      </ul>

      <Footer />
    </PageWrapper>
  )
}
