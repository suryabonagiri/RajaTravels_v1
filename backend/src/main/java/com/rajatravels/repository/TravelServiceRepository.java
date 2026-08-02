package com.rajatravels.repository;

import com.rajatravels.model.TravelService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelServiceRepository extends JpaRepository<TravelService, String> {
    List<TravelService> findAllByOrderBySortOrderAsc();
}
