<template>
    <div class="information">
        <h1>О классах PANDORA</h1>
        <info-banner bg-class="somi" />
        <div class="information-block">
            <div class="information-item information-item--mr">
                <info-text :data="dataFirst" />
                <info-text :data="dataSecond" />
            </div>
            <div class="information-item information-item--img">
                <img
                    class="information__img"
                    src="@/assets/images/about-img2.png"
                    alt="image"
                >
            </div>
        </div>
        <info-text :data="dataThird" />
        <div class="information-block">
            <div class="information-item information-item--img">
                <img
                    class="information__img"
                    src="@/assets/images/about-img.png"
                    alt="image"
                >
            </div>
            <div class="information-item information-item--ml">
                <info-text :data="dataFourth" />
            </div>
        </div>
        <div class="information-example">
            <h4>Примеры работ тренера</h4>
            <div class="information-example__content">
                <player-youtube
                    url="https://www.youtube.com/watch?v=z-XjcLcOntc"
                    width="735"
                    height="410"
                />
                <player-youtube
                    url="https://www.youtube.com/watch?v=veLLGl9zfTk"
                    width="735"
                    height="410"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import InfoBanner from "@/components/InfoBanner.vue"
import InfoText from "@/components/InfoText.vue"
import PlayerYoutube from "@/components/PlayerYoutube.vue"

@Component({
    components: {
        InfoBanner,
        InfoText,
        PlayerYoutube,
    },
})
export default class AboutView extends Vue {

    dataFirst = {
        title:     "Привет и добро пожаловать в PANDORA!️",
        textFirst: ["Наша цель - создать творческое k-pop комьюнити для таких классных ребят, как ты." +
        " Здесь тебе будет комфортно уже после первого занятия."],
        list: [
            "Мы ставим топовые k-pop хоряги",
            "Учимся как правильно вести себя на камеру",
            "Практикуемся в командной работе",
            "Весело и с пользой проводим вместе время",
        ],
        textSecond: [],
    }

    dataSecond = {
        title:     "Как думаешь, зачем тебе эти k-pop классы?",
        textFirst: ["Есть те, кто всегда мечтал быть в кавер группе и ставить классные проекты," +
        " или танцевать с друзьями рандом дэнс, или может быть тебе просто понравилась хореография," +
        " но самостоятельно с трудом удается её разобрать и ты ищешь, кто бы смог тебе в этом помочь." +
        " В PANDORA всё это возможно!"],
        list:       [],
        textSecond: [],
    }

    dataThird = {
        title:     "В чем “прикол” классов PANDORA?",
        textFirst: [
            "Присоединиться к нашим классам может любой желающий в возрасте от 14+. " +
            "На занятиях мы подробно разбираем выбранную часть k-pop хореографии, учимся работать на камеру, " +
            "работать в команде, ты также узнаешь о многих лайфхаках в cover dance.",
            "Классы делятся на “open” (открытые) и “project” (закрытые, проектные)."],
        list: [
            "<span>“Open” классы</span> - каждую тренировку новый танец. Разбираем самую сочную часть, в конце пробуем сниматься, делать коллабы. Прийти на такие классы могут все по предварительной записи. Выбирай понравившуюся хореографию, записывайся и приходи на тренировку.",
            "<span>“Project” классы</span> - целый месяц разбираем один танец. Прийти по-прежнему может любой, кому нравится хореография, но запись ведется только один раз перед началом серии тренировок. Далее группа закрывается и в течение месяца изучаем, разбираем большую часть хореографии. Иногда делимся на основной состав и подтанц, иногда тренер делает расстановку для всех участников “project” класса. Данные тренировки максимально помогают проникнуться атмосферой командной подготовки к проекту. Начиная от разбора хореографии, заканчивая подбором костюмов и профессиональной съемкой.",
        ],
        textSecond: [
            "С каким танцевальным уровнем можно прийти на классы? В теории - с любым. По факту - для тех, кто никогда не танцевал будет тяжеловато по началу. В PANDORA не учат танцевать с нуля. Наши классы - про развитие, про движ, про любовь к k-pop. Ты сам решаешь на какие танцы хочешь прийти. А самое главное, таким образом, можно найти единомышленников, которым также нравится исполнитель той или иной хореографии.",
            "Если ты нашел на занятиях друзей, с которыми решил поставить танец, создать группу - не вопрос, в PANDORA поддержат тебя, помогут с продвижением в соц. сетях, посоветуют тренировочные залы, подскажут где найти хорошего видеографа, локации для съемки танца. В индивидуальном порядке возможна помощь тренера в постановке номера.",
        ],
    }

    dataFourth = {
        title:     "Кто ведёт занятия?",
        textFirst: [
            "Руководитель, создатель, тренер, постановщик в PANDORA - Nastya+ (или просто Настя). Если кратко:",
        ],
        list: [
            "Уже более 10 лет увлекается k-pop индустрией",
            "Танцует cover dance примерно столько же лет",
            "Собрала классную cover-команду, настоящую семью BOUNCE",
            "Преподавала в танцевальной школе EXTRA DANCE k-pop направление",
            "Являлась участником и победителем многих фестивалей и мероприятий: IdolCon, FireChamp, " +
            "K-pop cover dance battle, Korean Dream, Yuki no Odori, Animatrix, Ichiharu, Toguchi, Jiyuu",
            "Проводила и проводит мастер-классы",
            "Была в составе жюри на мероприятиях",
            "Уже сбилась со счета поставленных танцев",
        ],
        textSecond: [
            "Её любимчики среди айдолов, начиная с самого начала увлечения k-pop: Super Junior, Infinite, VIXX, GOT7, 4Minute, HyunA, MAMAMOO, Dream Catcher, KARD, ChangHa, ATEEZ, aespa. Но предпочитает слушать синглы и альбомы различных исполнителей.",
            "Наш тренер считает, что k-pop многогранен. Каждый найдет здесь что-то по душе. У него есть свой стиль, не похожий ни на что, который влюбляет в себя миллионы людей.",
            "Записываясь на занятие, Настя замотивирует тебя прийти еще раз, еще раз и еще раз. Ну или как минимум ты воодушевишься заниматься танцами и изучать k-pop хореографии.",
            "Пару слов от тренера: “Я постараюсь сделать тренировку максимально комфортной по атмосфере. Подскажу и порекомендую как лучше учить танцы дома, как правильно себя вести на камеру, расскажу лайфхаки по cover dance. Если ты переживаешь, что у тебя не получится или боишься большого количества народу - советую просто попробовать. Все мы когда-то начинали. Участники все дружные и отзывчивые. Я уверена - мы поладим!“",
        ],
    }
    
}
</script>

<style lang="scss">
    .information {
        color: $color-black;
        &-block {
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;
            @media all and (max-width: 1600px) {
                flex-direction: column;
            }
        }
        &-item {
            margin-bottom: 20px;
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
            &--mr {
                margin-right: 30px;
                @media all and (max-width: 1600px) {
                    margin-right: 0;
                }
            }
            &--ml {
                margin-left: 30px;
                @media all and (max-width: 1600px) {
                    margin-left: 0;
                }
            }
            &--img {
                flex-shrink: 0;
            }
        }
        &__img {
            max-width: 100%;
        }
        &-example {
            h4 {
                margin-bottom: 15px;
            }
            &__content {
                display: flex;
                @media all and (max-width: 800px) {
                    flex-direction: column;
                }
            }
        }
    }
</style>
