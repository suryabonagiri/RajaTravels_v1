package com.rajatravels.repository;

import com.rajatravels.model.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourPackageRepository extends JpaRepository<TourPackage, String> {
    List<TourPackage> findAllByOrderBySortOrderAsc();
}
