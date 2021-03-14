import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getMonthNameFromMonthNum,convertDateToDateFormat } from '../master';
import { getBadgeFromDayOfWeek } from '../master';
import { fetchDailyTask, setCurrentDateSelect } from '../action';

const WeeklyDayPicker = ()=>{

    const [ currentDatePicked, setCurrentDatePicked] = useState(new Date());
    const [ weekDateList, setWeekDateList ] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{

        if( !currentDatePicked ){
            setCurrentDatePicked(new Date());
            dispatch(setCurrentDateSelect( convertDateToDateFormat(new Date()) ));
        }
            
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

    const selectDate = (data)=>{
        if( data.dateString !== convertDateToDateFormat(currentDatePicked)){       
            let dateSelected = new Date(data.dateString);
            dispatch(setCurrentDateSelect(data.dateString));
            setCurrentDatePicked(dateSelected);
            setWeekDateList([]);

            setTimeout(()=>{
                dispatch(fetchDailyTask(dispatch,data.dateString));
            },200)
        }

    }


    return (
        <div style={{minHeight:'13vh',maxHeight:'13vh'}} className={'border'}>
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
                            </Col>
                        ):(
                            <Col key={'month'+index} className={'border btn bg-dark'} onClick={()=>selectDate(val)}>
                                {getBadgeFromDayOfWeek(val.dayOfWeek)}
                                <h6 style={{'marginTop':'0.1rem','marginBottom':'0rem'}} className={'text-light'}>
                                    {val.month}
                                </h6> 
                                <span className={'text-light'}>{val.date}</span>
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