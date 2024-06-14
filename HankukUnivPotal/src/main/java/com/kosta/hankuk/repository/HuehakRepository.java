package com.kosta.hankuk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Huehak;

public interface HuehakRepository extends JpaRepository<Huehak, Integer> {
	Page<Huehak> findByStudent_StdNo(String stdNo, PageRequest pageRequest);
	Page<Huehak> findByType(String type, PageRequest pageRequest);
	Page<Huehak> findByStatus (String status, PageRequest pageRequest);
	Page<Huehak> findByStatusAndType(String status, String type, PageRequest pageRequest);
}
