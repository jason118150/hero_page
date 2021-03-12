import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HeroCard } from '../../component/heroCard';
import { Loading } from '../../component/loading';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation} from "react-router";
import { setLoading } from '../../store/action/global';

const HeroWrapper = styled.div`
    width: 80vw;
    margin: 40px auto;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    .detail-container {
        border: 1px solid black;
        height: 500px;
        width: 100%;
        position: relative;
        .detail-content {
            display: flex;
            height: 125px;
            width: 100%;
            .detail-title {
                width: 200px;
                font-size: 40px;
                line-height: 125px;
                padding: 0 40px;
            }
            .detail-value {
                width: 150px;
                font-size: 40px;
                line-height: 125px;
                padding: 0 40px;
            }
            button {
                border: 1px solid black;
                border-radius: 8px;
                height: 40px;
                width: 40px;
                font-size: 40px;
                line-height: 40px;
                margin-top: 40px;
                &:focus {
                    outline: 0;
                }
            }
        }
        .detail-left {
            font-size: 40px;
            position: absolute;
            right: 80px;
            bottom: 120px;
        }
        .detail-save {
            font-size: 24px;
            position: absolute;
            width: 120px;
            height: 40px;
            border: 1px solid black;
            right: 80px;
            border-radius: 8px;
            bottom: 40px;
            &:focus {
                outline: 0;
            }
        }
        @media (max-width: 992px) {
            height: 700px;
        }
    }
`

const profileList = [
    { title: 'STR' },
    { title: 'INT' },
    { title: 'AGI' },
    { title: 'LUK' }
]

export const HeroDetail = () => {
    const dispatch = useDispatch();
    const heroID = useLocation().pathname.split('/')[2];
    const heroList = JSON.parse(localStorage.getItem('hero'));
    const [heroProfile, setHeroProfile] = useState({
        str: 0,
        int: 0,
        agi: 0,
        luk: 0,
        left: 0,
    });
    const isLoading = useSelector(store => store.global.isLoading);

    // 能力值   小於等於0 則不能減能力值
    // 剩餘點數  小於等於0 則不能加能力值
    //          不等於0  則不能按送出
    const handlePlus = (type) => {
        if(heroProfile.left > 0) {
            const tmp = JSON.parse(JSON.stringify(heroProfile));
            tmp[type.toLowerCase()] += 1;
            tmp.left -= 1;
            setHeroProfile(tmp);
        }
    }

    const handleMinus = (type) => {
        if(heroProfile[type.toLowerCase()] > 0) {
            const tmp = JSON.parse(JSON.stringify(heroProfile));
            tmp[type.toLowerCase()] -= 1;
            tmp.left += 1;
            setHeroProfile(tmp);
        }
    }

    const handleSave = () => {
        if(heroProfile.left !== 0) {
            alert('有點數尚未分配');
            return;
        }
        let tmp = {
            str: heroProfile.str,
            int: heroProfile.int,
            agi: heroProfile.agi,
            luk: heroProfile.luk,
        }
        fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroID}/profile`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(tmp),
        })
        .then(response => {
            alert('儲存成功')
        })
        .catch(error => {
            console.log(console.log(`Fail to fetch API, error message: ${error}`))
            if(error) alert('儲存失敗')
        })
    }

    useEffect(() => {
        dispatch(setLoading(true));
        fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroID}/profile`)
        .then(response => response.json())
        .then(response => {
            setHeroProfile(data => ({
                ...data,
                ...response,
            }));
            dispatch(setLoading(false))

        })
        .catch(error => console.log(`Fail to fetch API, error message: ${error}`))
    }, [heroID, dispatch])

    return ( 
        <HeroWrapper>
            {
                heroList.map((value, key) => {
                    return (
                        <HeroCard
                            key={key}
                            id={value.id}
                            name={value.name}
                            imgUrl={value.image}
                        ></HeroCard>
                    )
                })
            }
            {
                isLoading ? <Loading /> :
                <div className="detail-container">
                    {
                        profileList.map((value, index) => {
                            return (
                                <div className="detail-content" key={index}>
                                    <span className="detail-title">{value.title}</span>
                                    <button onClick={() => handlePlus(value.title)}>+</button>
                                    <span className="detail-value">{heroProfile[value.title.toLowerCase()]}</span>
                                    <button onClick={() => handleMinus(value.title)}>-</button>
                                </div>
                        )})
                    }
                    <div className="detail-left">剩餘點數: {heroProfile.left}</div>
                    <button className="detail-save" onClick={handleSave}>儲存</button>
                </div>
            }
        </HeroWrapper>
    )
}