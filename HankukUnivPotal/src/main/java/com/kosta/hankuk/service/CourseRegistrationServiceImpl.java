package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureBasket;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.LectureBasketRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.StudentRepository;

@Service
public class CourseRegistrationServiceImpl implements CourseRegistrationService {

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private LectureByStdRepository lectureByStdRepository;
	
	@Autowired
	private LectureRepository lectureRepository;
	
	@Autowired
	private LectureBasketRepository lectureBasketRepository;

	@Override
	public Map<String, Object> loadStudentInformation(String stdNo) throws Exception {
		Student student = studentRepository.findById(stdNo).get();		
		String majorName = student.getMajor().getName();		
		Integer finSem = student.getFinSem();
		Integer finCredit = student.getFinCredit();
		Integer courYear = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		
		Map<String, Object> map = new HashMap<>();
		map.put("majorName", majorName);
		map.put("finCredit", finCredit);
		map.put("courYear", courYear);
		map.put("semester", semester);
		return map;
	}
	
	public List<Map<String, Object>> showCourseRegistration(String majCd, Integer targetGrd) throws Exception {
		List<Lecture> lectureList = lectureRepository.findBySubject_Major_majCdAndSubject_targetGrd(majCd, targetGrd);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (Lecture lecture : lectureList) {			
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			if(lectureType.equals("P")) {
				type = "전필";
			} else if(lectureType.equals("S")) {
				type = "전선";
			}

			Map<String, Object> map = new HashMap<>();
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void registerForCourse(String stdNo, String lecNo) throws Exception {
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer courYear = (finSem / 2) + 1;
		
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository.findByLecture_lecNo(lecNo);
		Integer currentCount = lectureByStdGroup.size();
		Integer wholeCount = lectureRepository.findById(lecNo).get().getNumOfStd();
		if(wholeCount > currentCount) {
			LectureByStd lectureByStd = LectureByStd.builder()
					.courYear(courYear)
					.isDrop(false)
					.student(Student.builder().stdNo(stdNo).build())
					.lecture(Lecture.builder().lecNo(lecNo).build()).build();
			lectureByStdRepository.save(lectureByStd);
		}
	}
	
	public List<Map<String, Object>> showCourseRegistrationConfirmation(String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer courYear = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, courYear, semester);
		for(LectureByStd lectureByStd : lectureByStdGroup) {
			Lecture lecture = lectureByStd.getLecture();
			Integer lbsNumber = lectureByStd.getLbsNo();
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			if(lectureType.equals("P")) {
				type = "전필";
			} else if(lectureType.equals("S")) {
				type = "전선";
			}
			
			Map<String, Object> map = new HashMap<>();
			map.put("lbsNumber", lbsNumber);
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void removeCourseRegistration(Integer lbsNo) throws Exception {
		lectureByStdRepository.deleteById(lbsNo);
	}
	
	public List<Map<String, Object>> showPreRegistration(String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		List<LectureBasket> lectureBasketGroup = lectureBasketRepository.findByStudent_stdNo(stdNo);
		
		for(LectureBasket lectureBasket : lectureBasketGroup) {
			Lecture lecture = lectureRepository.findById(lectureBasket.getLecture().getLecNo()).get();
			Integer lbNumber = lectureBasket.getLbNo();
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			if(lectureType.equals("P")) {
				type = "전필";
			} else if(lectureType.equals("S")) {
				type = "전선";
			}
			
			Map<String, Object> map = new HashMap<>();
			map.put("lbNumber", lbNumber);
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void preRegisterCourse(String stdNo, String lecNo) throws Exception {
		LectureBasket lectureBasket = LectureBasket.builder()
				.student(Student.builder().stdNo(stdNo).build())
				.lecture(Lecture.builder().lecNo(lecNo).build()).build();
		lectureBasketRepository.save(lectureBasket);
	}
	
	public void removePreRegistration(Integer lbNo) throws Exception {
		lectureBasketRepository.deleteById(lbNo);
	}
}