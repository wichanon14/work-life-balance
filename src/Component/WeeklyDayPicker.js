import { useEffect, useState } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { getMonthNameFromMonthNum,convertDateToDateFormat } from '../master';
import { getBadgeFromDayOfWeek } from '../master';
import { fetchDailyTask, setCurrentDateSelect, fetchWeekOverview, setGroupForDisplayDaily } from '../action';

const WeeklyDayPicker = ()=>{

    const dispatch = useDispatch();
    const dailyStore = useSelector(state=>state.dailyList)
    const [ currentDatePicked, setCurrentDatePicked] = useState(new Date());
    const [ weekDateList, setWeekDateList ] = useState([]);
    const [ weekPriorityList, setWeekPriorityList] = useState({});    

    useEffect(()=>{
        setWeekPriorityList(dailyStore.weeklyTaskOverview)
    },[dailyStore.weeklyTaskOverview])

    useEffect(()=>{
        const WeeklyGenerate = ()=>{

            let weekDateListTmp = [];
            let dateList = [];
            
            for(let i = -3; i<4 ; i++){
    
                let dayGenerate = currentDatePicked;
                if( i < 0){
                    dayGenerate = currentDatePicked-1;
                    dayGenerate = dayGenerate+(3600*1000*24*i)
                }else{
                    let tomorrow = new Date(currentDatePicked);
                    tomorrow.setDate( dayGenerate.getDate()+i )
                    dayGenerate = tomorrow;
                }
                let targetDate = new Date(dayGenerate)
                let date = targetDate.getDate();
                let month = getMonthNameFromMonthNum(targetDate.getMonth());
    
                if( convertDateToDateFormat(targetDate) === convertDateToDateFormat(currentDatePicked) ){
                    weekDateListTmp.push({
                        date:date,
                        month:month.substr(0,3),
                        dateSelect:true,
                        dateString:convertDateToDateFormat(targetDate),
                        dayOfWeek:targetDate.getDay()
                    })
                }else{
                    weekDateListTmp.push({
                        date:date,
                        month:month.substr(0,3),
                        dateString:convertDateToDateFormat(targetDate),
                        dayOfWeek:targetDate.getDay()
                    })
                }
                dateList.push(convertDateToDateFormat(targetDate))
    
            }

            return weekDateListTmp
        
        }

        if( !currentDatePicked ){
            setCurrentDatePicked(new Date());
        }
            
        if( weekDateList.length===0 )
            setWeekDateList(WeeklyGenerate())
        
    },[weekDateList,currentDatePicked])

    const DateListWeeklyGenerated = ()=>{

        let weekDateListTmp = [];
        let dateList = [];
        
        for(let i = -3; i<4 ; i++){

            let dayGenerate = currentDatePicked;
            if( i < 0){
                dayGenerate = currentDatePicked-1;
                dayGenerate = dayGenerate+(3600*1000*24*i)
            }else{
                let tomorrow = new Date(currentDatePicked);
                tomorrow.setDate( dayGenerate.getDate()+i )
                dayGenerate = tomorrow;
            }
            let targetDate = new Date(dayGenerate)
            let date = targetDate.getDate();
            let month = getMonthNameFromMonthNum(targetDate.getMonth());

            if( convertDateToDateFormat(targetDate) === convertDateToDateFormat(currentDatePicked) ){
                weekDateListTmp.push({
                    date:date,
                    month:month.substr(0,3),
                    dateSelect:true,
                    dateString:convertDateToDateFormat(targetDate),
                    dayOfWeek:targetDate.getDay()
                })
            }else{
                weekDateListTmp.push({
                    date:date,
                    month:month.substr(0,3),
                    dateString:convertDateToDateFormat(targetDate),
                    dayOfWeek:targetDate.getDay()
                })
            }
            dateList.push(convertDateToDateFormat(targetDate))

        }

        return dateList
    
    }

    useEffect(()=>{
        dispatch(fetchWeekOverview(dispatch,DateListWeeklyGenerated()));
    },[currentDatePicked])

    const selectDate = (data)=>{
        let dateSelected = new Date(data.dateString);
        dispatch(setCurrentDateSelect(data.dateString));
        setCurrentDatePicked(dateSelected);
        setWeekDateList([]);
        
        setTimeout(()=>{
            dispatch(fetchDailyTask(dispatch,data.dateString));
            dispatch( setGroupForDisplayDaily(0) )
        },100)
        console.log( ' fetch >> ',DateListWeeklyGenerated())
    }


    return (
        <div className={'border'}>
            <Row className={'text-center'} style={{margin: 0}}>
            {
                weekDateList.map((val,index)=>
                    (
                        (!val.dateSelect)?
                        (
                            <Col key={'month'+index} className={'border btn bg-light'} onClick={()=>selectDate(val)}>
                                {getBadgeFromDayOfWeek(val.dayOfWeek)}
                                <h6 style={{'marginTop':'0.1rem','marginBottom':'0rem'}}>
                                    {val.month}
                                </h6> 
                                <span>{val.date}</span>
                                <Row className={'justify-content-center'}>
                                    {
                                        (weekPriorityList[val.dateString] && weekPriorityList[val.dateString].length > 0)?
                                        (
                                            <Badge pill variant={'warning'}> </Badge>
                                        ):''
                                    }
                                </Row>
                            </Col>
                        ):(
                            <Col key={'month'+index} className={'border btn bg-dark'} onClick={()=>selectDate(val)}>
                                {getBadgeFromDayOfWeek(val.dayOfWeek)}
                                <h6 style={{'marginTop':'0.1rem','marginBottom':'0rem'}} className={'text-light'}>
                                    {val.month}
                                </h6> 
                                <span className={'text-light'}>{val.date}</span>
                                <Row className={'justify-content-center'}>
                                    {
                                        (weekPriorityList[val.dateString] && weekPriorityList[val.dateString].length > 0)?
                                        (
                                            <Badge pill variant={'warning'}> </Badge>
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