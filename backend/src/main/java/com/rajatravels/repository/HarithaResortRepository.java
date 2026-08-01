package com.rajatravels.repository;

import com.rajatravels.model.HarithaResort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HarithaResortRepository extends JpaRepository<HarithaResort, Long> {
    List<HarithaResort> findAllByOrderBySortOrderAsc();
}
