import React, {useEffect, useState} from 'react'
import s from './live-shows.module.css'
import {LiveShowService} from "../../services/liveShowsService";
import {Icon} from "antd";

const liveShows = [
    {
        id: 'we-are-pgc',
        title: 'We Are PGC',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2013, 5, 17),
        cover: 'pictures/we-are-pgc.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
    {
        id: 'black-and-white',
        title: 'Black & White',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2013, 11, 1),
        cover: 'pictures/black-and-white.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
    {
        id: 'on-rainy-days',
        title: 'On Rainy Days',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2014, 5, 24),
        cover: 'pictures/on-rainy-days.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
    {
        id: 'recall',
        title: 'PGC - Recall',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2016, 9, 24),
        cover: 'pictures/li-nhi-2.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
    {
        id: 'mono',
        title: 'PGC - Mono Show',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2018, 5, 20),
        cover: 'pictures/mono-show.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
    {
        id: 'li-nhi',
        title: 'Lí Nhí - Guitar Show',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget aliquet nibh praesent tristique magna sit amet purus. Leo a diam sollicitudin tempor id eu nisl. Sed adipiscing diam donec adipiscing tristique risus. Faucibus a pellentesque sit amet porttitor eget dolor.',
        date: new Date(2019, 5, 18),
        cover: 'pictures/li-nhi.jpg',
        pictures: [
            'pictures/black-and-white.jpg',
            'pictures/li-nhi-2.jpg',
            'pictures/li-nhi.jpg',
            'pictures/mono-show.jpg',
            'pictures/on-rainy-days.jpg',
            'pictures/we-are-pgc.jpg',
        ],
    },
]
const imageGrid = [
    {
        column: 1,
        row: 2,
    },
    {
        column: 1,
        row: 1,
    },
    {
        column: 1,
        row: 1,
    },
    {
        column: 1,
        row: 2,
    },
    {
        column: 2,
        row: 2,
    },
]

const LiveShows = props => {

    const [stLiveShows, setStLiveShows] = useState([]);

    useEffect(() => {
        LiveShowService.getAllOrderByTimestampDESC()
            .then(result => {
                const liveshows = result.map(doc => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        title: data.name,
                        description: data.description,
                        date: data.date,
                        cover: data.background,
                        pictures: [...data.gallery],
                        playlist: data.playlist,
                        place: data.place
                    }
                })
                setStLiveShows(liveshows)
            })
    }, [])

    return (
        <div className={s.shows}>
            {stLiveShows.map((liveShow, i) => (
                <div key={`live-show-${liveShow.id || i}`} className={s.show}>
                    <img className={s.background} src={liveShow.cover} alt="" />
                    <div className={s.info}>
                        <span className={s.title}>{liveShow.title}</span>
                        <span className={s.guitar_show}>Guitar Show</span>
                        <div className={s.place}>
                            <span className={s.date}>
                                <Icon type="clock-circle" />
                                {' '}{liveShow.date}
                                {'  |  '}
                                <Icon type="environment" />
                                {' '}{liveShow.place}
                            </span>
                        </div>
                        {liveShow.playlist &&
                        <iframe className={s.youtube} height='315px' src={`https://www.youtube.com/embed/videoeries?list=${liveShow.playlist}`} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>}
                        {/*<span className={s.description}>{liveShow.description}</span>*/}
                    </div>
                    <div className={s.pictures}>
                        {liveShow.pictures.slice(0, imageGrid.length).map((liveShowPicture, j) => (
                            <div
                                key={`live-show-picture-${j}`}
                                className={s.picture}
                                style={{backgroundImage: `url(${liveShowPicture})`}}
                                data-column={imageGrid[j].column}
                                data-row={imageGrid[j].row}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LiveShows