package com.kosta.hankuk.service;

import java.util.List;

import com.kosta.hankuk.dto.AbsenceDto;
import com.kosta.hankuk.dto.AppealDto;
import com.kosta.hankuk.dto.AttendanceDto;
import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.ExamResultDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.HomeworkSubmitDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.dto.LessonDataDto;

public interface ProfService {
	
	List<LectureDto> lectureList(String profNo, Integer year, String div) throws Exception;
	
	String lectureWrite(LectureDto lectureDto) throws Exception;

	LectureDto lectureDetail(String lecNo) throws Exception;
	
	String lectureModify(LectureDto lectureDto) throws Exception;
	
	List<LectureDto> lectureDashboard(String profNo, Integer year) throws Exception;
	
	List<LessonDataDto> lessonDataList(String lecNo) throws Exception;

	List<HomeworkDto> homeworkList(String lecNo) throws Exception;

	void homeworkWrite(HomeworkDto homeworkDto) throws Exception;

	HomeworkDto homeworkSelectOne(Integer hwNo) throws Exception;

	void homeworkModify(HomeworkDto homeworkDto) throws Exception;

	void lessonDataWrite(LessonDataDto lessonDataDto) throws Exception;

	LessonDataDto lessonDataSelectOne(Integer ldNo) throws Exception;

	void lessonDataModify(LessonDataDto lessonDataDto) throws Exception;
		
	List<AttendanceDto> attendanceList(String lecNo) throws Exception;
	
	void attendanceModify(List<AttendanceDto> attendanceList) throws Exception;

	void examAndQuestionWrite(ExamDto examDto, List<ExamQuesDto> questionDtoList) throws Exception;

	List<LectureByStdDto> studentListByLecNo(String lecNo) throws Exception;

	List<ExamResultDto> examResultListByLecNo(String lecNo) throws Exception;

	List<HomeworkSubmitDto> homeworkSubmitListByLecNo(String lecNo) throws Exception;

	Integer homeworkCount(String lecNo) throws Exception;

	void examResultModify(List<ExamResultDto> examResultDtoList) throws Exception;

	List<LectureByStdDto> gradeWrite(List<LectureByStdDto> lectureByStuDtoList) throws Exception;

	List<AppealDto> appealList(String lecNo) throws Exception;

	void appealModify(AppealDto appealDto) throws Exception;

	List<AbsenceDto> absenceList(String lecNo) throws Exception;

	void absenceModify(AbsenceDto absenceDto) throws Exception;

	


	

	

	


	

	

	
	
}
