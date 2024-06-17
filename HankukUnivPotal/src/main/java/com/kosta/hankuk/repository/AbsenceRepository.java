package com.kosta.hankuk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Absence;

public interface AbsenceRepository extends JpaRepository<Absence, Integer> {
	Optional<Absence> findByLesson_lessonNoAndStudent_stdNo(Integer lessonNo, String stdNo);
}
