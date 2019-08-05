package com.integration.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.text.DecimalFormat;
import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integration.dao.AttenceDAO;
import com.integration.entity.AttenceDetail;
import com.integration.entity.AttenceStatic;
import com.integration.entity.AttenceWaring;
import com.integration.entity.PatrolEvent;
import com.integration.entity.StandardDay;
import com.integration.entity.SumLength;
import com.integration.entity.Survey;
import com.integration.service.AttenceService;
import com.integration.entity.RouteReplay;

@Service
public class AttenceServiceImpl implements AttenceService {
	@Autowired
	AttenceDAO ad;
	
	@Override
	public List<AttenceDetail> QueryAttenceDetail(String department, String personName, String attenceMonth,String projectType) {
		// TODO Auto-generated method stub
		return ad.QueryAttenceDetail(department, personName, attenceMonth,projectType);
	}

	@Override
	public List<AttenceStatic> AttenceStatic(String department, String personName,String attenceMonth,String projectType) {
		// TODO Auto-generated method stub
		return ad.AttenceStatic(department, personName, attenceMonth,projectType);
	}

	@Override
	public List<StandardDay> QueryChangeRecords() {
		// TODO Auto-generated method stub
		return ad.QueryChangeRecords();
	}

	@Override
	public void insert_setStandardDay_Record(String userName, String mobile, Integer standardDay, String today,
			String effectDay, String uuid,Integer isEffective) {
		// TODO Auto-generated method stub
		ad.insert_setStandardDay_Record(userName,mobile,standardDay,today,effectDay,uuid,isEffective);
	}
	
	@Override
	public void updateEff(String effectDay){
		ad.updateEff(effectDay);
	}
	
	@Override
	public Integer getStandardDay(String attenceMonth){
		return ad.getStandardDay(attenceMonth);
	}

	@Override
	@SuppressWarnings("unused")
	public Survey querySurvey(String thisMonth) {
		// TODO Auto-generated method stub
		if(thisMonth.length() == 4){			
			List<com.integration.entity.AttenceStatic> attenceStatic= ad.queryTrailYear(thisMonth);
			
			//Integer tianshu_dabiao = 0;
			
			Double licheng = 0.0;
			for (com.integration.entity.AttenceStatic attenceSta : attenceStatic) {
				licheng = licheng +attenceSta.getSumLength();
				//tianshu_dabiao = tianshu_dabiao +attenceSta.getQualifiedDays();
			}
			String day_before = thisMonth + "-01-01";
			//String[] split = thisMonth.split("-");
			String day_after = (Integer.parseInt(thisMonth)+1) + "-01-01";
			List<PatrolEvent> patrolEvent= ad.queryEvent(day_before,day_after);
			
			Integer num_events = patrolEvent.size();
			Integer num_photos = 0;
			String eventsDep ="";
			for (PatrolEvent patrolEve : patrolEvent) {
				if (patrolEve.getEventPhoto() != null && patrolEve.getEventPhoto() != "") {
					num_photos++;
				}
				eventsDep +=  patrolEve.getDepartmentCode() + ",";
			}
			Integer chuqinrenci = ad.find_renci_chuqin(day_before,day_after);
			
			Survey survey = new Survey();
			
			Double[] lc = new Double[1];
			
			survey.setLicheng(licheng);
			survey.setMonth(thisMonth);
			//survey.setDays_dabiao(tianshu_dabiao);
			survey.setNum_events(num_events);
			survey.setNum_photos(num_photos);
			survey.setRenci_chuqin(chuqinrenci);
			survey.setEventsDep(eventsDep);
			thisMonth = thisMonth + "%";
			List<SumLength> topten = ad.queryTopTen(thisMonth);
			for (SumLength sumLength : topten) {
				Double[] data = new Double[1];
				data[0] = sumLength.getLicheng();
				sumLength.setData(data);
			}
			survey.setTopTen(topten);
			
			List<SumLength> eachDep = ad.queryEachDep(thisMonth);
			for (SumLength sumLength : eachDep) {
				Double[] data = new Double[1];
				data[0] = sumLength.getLicheng();
				sumLength.setData(data);
			}
			survey.setEachDep(eachDep);
			
			List<RouteReplay> diffTime = ad.QueryShichang(thisMonth);
			long longExpend = 0;
			for (RouteReplay dTime :diffTime){
				String StartTime = dTime.getStartTime();
				String EndTime = dTime.getEndTime();
				long longStart = getTimeMillis(StartTime); //获取开始时间毫秒数
			    long longEnd = getTimeMillis(EndTime);  //获取结束时间毫秒数
			    longExpend += longEnd - longStart;  //获取时间差
			}
			String diff_Time = printDifference(longExpend);
			survey.setDiff_Time(diff_Time);
			
			return survey;
		}else{
			List<com.integration.entity.AttenceStatic> attenceStatic= ad.queryTrail(thisMonth);
			
			//Integer tianshu_dabiao = 0;
			
			Double licheng = 0.0;
			for (com.integration.entity.AttenceStatic attenceSta : attenceStatic) {
				licheng = licheng +attenceSta.getSumLength();
				//tianshu_dabiao = tianshu_dabiao +attenceSta.getQualifiedDays();
			}
			String day_before = thisMonth + "-01";
			String[] split = thisMonth.split("-");
			String day_after;
			
			if ("12".equals(split[1])) {
				day_after = (Integer.parseInt(split[0])+1) + "-01-01";
			}else {
				day_after = split[0] +"-"+ (Integer.parseInt(split[1])+1) + "-01";
			}
			
			List<PatrolEvent> patrolEvent= ad.queryEvent(day_before,day_after);
			
			Integer num_events = patrolEvent.size();
			Integer num_photos = 0;
			String eventsDep ="";
			for (PatrolEvent patrolEve : patrolEvent) {
				if (patrolEve.getEventPhoto() != null && patrolEve.getEventPhoto() != "") {
					num_photos++;
				}
				eventsDep +=  patrolEve.getDepartmentCode() + ",";
			}
			Integer chuqinrenci = ad.find_renci_chuqin(day_before,day_after);
			
			Survey survey = new Survey();
			
			Double[] lc = new Double[1];
			
			survey.setLicheng(licheng);
			survey.setMonth(thisMonth);
			//survey.setDays_dabiao(tianshu_dabiao);
			survey.setNum_events(num_events);
			survey.setNum_photos(num_photos);
			survey.setRenci_chuqin(chuqinrenci);
			survey.setEventsDep(eventsDep);
			thisMonth = thisMonth + "%";
			List<SumLength> topten = ad.queryTopTen(thisMonth);
			for (SumLength sumLength : topten) {
				Double[] data = new Double[1];
				data[0] = sumLength.getLicheng();
				sumLength.setData(data);
			}
			survey.setTopTen(topten);
			
			List<SumLength> eachDep = ad.queryEachDep(thisMonth);
			for (SumLength sumLength : eachDep) {
				Double[] data = new Double[1];
				data[0] = sumLength.getLicheng();
				sumLength.setData(data);
			}
			survey.setEachDep(eachDep);
			
			List<RouteReplay> diffTime = ad.QueryShichang(thisMonth);
			long longExpend = 0;
			for (RouteReplay dTime :diffTime){
				String StartTime = dTime.getStartTime();
				String EndTime = dTime.getEndTime();
				long longStart = getTimeMillis(StartTime); //获取开始时间毫秒数
			    long longEnd = getTimeMillis(EndTime);  //获取结束时间毫秒数
			    longExpend += longEnd - longStart;  //获取时间差
			}
			String diff_Time = printDifference(longExpend);
			survey.setDiff_Time(diff_Time);
			
			return survey;
		}
	}

	@Override
	public List<AttenceWaring> QueryAttenceWaring() {
		// 获得前天日期
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Date date=new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -2);
		date = calendar.getTime();
		// System.out.println(sdf.format(date));
		
		return  ad.QueryAttenceWaring(sdf.format(date));
	}
	
	
    public String printDifference(long different){
        long secondsInMilli = 1000;
        long minutesInMilli = secondsInMilli * 60;
        long hoursInMilli = minutesInMilli * 60;
        long daysInMilli = hoursInMilli * 24;
 
        long elapsedDays = different / daysInMilli;
        different = different % daysInMilli;
 
        long elapsedHours = different / hoursInMilli;
        different = different % hoursInMilli;
 
         long elapsedMinutes = different / minutesInMilli;
        different = different % minutesInMilli;
        DecimalFormat df2 = new DecimalFormat("###.0");
        float hour = elapsedHours + (float)elapsedMinutes / 60;
        String hours = df2.format(hour);
        if(hours.equals(".0")){
        	hours = "0";
    	}
        if(hours.length() == 2 && hours.contains(".") && !hours.equals(".0")){
        	hours = "0" + hours;
        }
        //long elapsedSeconds = different / secondsInMilli;
        String DiffTime;
        
        if(elapsedDays == 0){
        		DiffTime = hours + "小时";
        }else{
        	DiffTime = elapsedDays + "天" + hours + "小时";
        }
        return DiffTime;
    }
	
	private long getTimeMillis(String strTime) {
        long returnMillis = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        Date d = null;
        try {
			d = sdf.parse(strTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        returnMillis = d.getTime();
        
        return returnMillis;
    }
}	

