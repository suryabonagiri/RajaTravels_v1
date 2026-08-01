package com.rajatravels.repository;

import com.rajatravels.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, String> {
    List<Destination> findAllByOrderBySortOrderAsc();
}
