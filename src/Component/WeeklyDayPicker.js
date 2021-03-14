import { useEffect, useState } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getMonthNameFromMonthNum,convertDateToDateFormat,getPriorityDisplay } from '../master';
import { fetchWeekOverview } from '../action';

const WeeklyDayPicker = ()=>{

    const dispatch = useDispatch();
    const dailyStore = useSelector(state=>state.dailyList)
    const [ currentDatePicked, setCurrentDatePicked] = useState(new Date());
    const [ weekDateList, setWeekDateList ] = useState([]);
    const [ weekPriorityList, setWeekPriorityList] = useState({});

    useEffect(()=>{
        setWeekPriorityList(dailyStore.weeklyTaskOverview)
        console.log(weekPriorityList)
        if( weekPriorityList['2021-03-11']){
            weekPriorityList['2021-03-11'].map((weekVal,weekIndex)=>{
                console.log(getPriorityDisplay(weekVal).color);
            })
        }
    },[dailyStore.weeklyTaskOverview])


    useEffect(()=>{

        if( !currentDatePicked )
            setCurrentDatePicked(new Date());
        let weekDateListTmp = WeeklyGenerate();
        if( weekDateList.length===0 )
            setWeekDateList(weekDateListTmp)
        else if( ((weekDateList[0].date !== weekDateListTmp[0].date)) && 
            (weekDateList[0].month !== weekDateListTmp[0].month) )
            setWeekDateList(weekDateListTmp)
        
    },[weekDateList,currentDatePicked])

    const WeeklyGenerate = ()=>{

        let weekDateListTmp = [];
        let dateList = [];
        
        for(let i = -3; i<4 ; i++){

            let dayGenerate = new Date();
            if( i < 0){
                dayGenerate = new Date()-1;
                dayGenerate = dayGenerate+(3600*1000*24*i)
            }else{
                let tomorrow = new Date();
                tomorrow.setDate( dayGenerate.getDate()+i )
                dayGenerate = tomorrow;
            }

            let date = new Date(dayGenerate).getDate();
            let month = getMonthNameFromMonthNum(new Date(dayGenerate).getMonth());


            if( convertDateToDateFormat(new Date(dayGenerate)) === convertDateToDateFormat(currentDatePicked) ){
                weekDateListTmp.push({
                    date:date,
                    month:month.substr(0,3),
                    dateSelect:true,
                    dateString:convertDateToDateFormat(new Date(dayGenerate))
                })
            }else{
                weekDateListTmp.push({
                    date:date,
                    month:month.substr(0,3),
                    dateString:convertDateToDateFormat(new Date(dayGenerate))
                })
            }
            dateList.push(convertDateToDateFormat(new Date(dayGenerate)))

        }
        dispatch(fetchWeekOverview(dispatch,dateList));
        console.log(weekDateListTmp)
        return weekDateListTmp
        
    
    }

    return (
        <div style={{minHeight:'10vh',maxHeight:'10vh'}} className={'border'}>
            <Row className={'text-center'} style={{margin: 0}}>
            {
                weekDateList.map((val,index)=>
                    (
                        (!val.dateSelect)?
                        (
                            <Col key={'month'+index} className={'border btn bg-light'}>
                                <h5 style={{'marginTop':'0.3rem','marginBottom':'0rem'}}>
                                    {val.month}
                                </h5> 
                                <span>{val.date}</span>
                                <Row className={'justify-content-center'}>
                                    {
                                        (weekPriorityList[val.dateString])?
                                        (
                                            weekPriorityList[val.dateString].map((weekVal,weeIndex)=>
                                                <Badge pill variant={getPriorityDisplay(weekVal).color}> </Badge>
                                            )
                                        ):''
                                    }
                                    
                                </Row>
                            </Col>
                        ):(
                            <Col key={'month'+index} className={'border btn bg-dark'}>
                                <h5 style={{'marginTop':'0.3rem','marginBottom':'0rem'}} className={'text-light'}>
                                    {val.month}
                                </h5> 
                                <span className={'text-light'}>{val.date}</span>
                                <Row className={'justify-content-center'}>
                                    {
                                        (weekPriorityList[val.dateString])?
                                        (
                                            weekPriorityList[val.dateString].map((weekVal,weeIndex)=>
                                                <Badge pill variant={getPriorityDisplay(weekVal).color}> </Badge>
                                            )
                                        ):''
                                    }
                                    
                                </Row>
                            </Col>
                        )
                    )
                )
            }
            </Row>
        </div>
    )

}


export default WeeklyDayPicker