import first from "../../assets/plusses/1.svg"
import second from "../../assets/plusses/2.svg"
import third from "../../assets/plusses/3.svg"
import "../../css/PlusesAndFooter.css"
import Plus from "./Plus.tsx";

const Pluses = () => {
    return (
        <section className="pluses" aria-labelledby="Плюсы">
            <h4 className="main-sign-pluses" id="pluses-heading">Почему стоит выбрать нас?</h4>
            <div className="container-main">
                <div className="pluses-main">
                    <Plus header={'Результативность'}
                          sign={'Каждый из обучающихся детей отрабатывает теоретические навыки на практике. Будь то создание роботов или игр в 3D.'}
                          img={first} delay={0}/>
                    <Plus header={'Участие в олимпиадах'}
                          sign={'У каждого ребенка будет возможность проявить себя в различных олимпиадах, за прохождение которых будут выдаваться сертификаты.'}
                          img={second} delay={0.1}/>
                    <Plus header={'Профессиональные кураторы'}
                          sign={'Наши программы обучения разработаны высококвалифицированными экспертами, а лучшие педагоги помогут все понять с первого раза.'}
                          img={third} delay={0.3} id={'plus-last'}/>
                </div>
            </div>
        </section>
    )
}
export default Pluses;