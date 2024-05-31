package com.kosta.hankuk.service;

import java.util.List;

import com.kosta.hankuk.dto.LectureDto;

public interface ProfService {
	
	List<LectureDto> lectureList(String profNo, String year, String div);
	
	Integer lectureWrite(LectureDto lectureDto) throws Exception;

	
	
}
