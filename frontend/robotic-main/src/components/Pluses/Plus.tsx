import {plusesAnimation} from "../../animations/animations.tsx";
import {motion} from "framer-motion";
interface inputInfo {
    header: string,
    sign: string,
    img: string,
    delay: number,
    id?: string
}

const Plus = (data: inputInfo) => {
    const {header, sign, img, delay, id} = data;

    return (
        <motion.figure className="plus" role="group" aria-label={header}
                       variants={plusesAnimation}
                       initial="hidden"
                       whileInView="visible"
                       transition={{duration: 0.8, delay: delay, type: 'spring'}}
                       viewport={{amount: 0.1}}>
            <img src={img} alt="" className="image-plus" loading="lazy"/>
            <div className="plus-text-div" id={id}>
                <h3 className="plus-name">{header}</h3>
                <p className="plus-description">{sign}</p>
            </div>
        </motion.figure>
    )
}
export default Plus;