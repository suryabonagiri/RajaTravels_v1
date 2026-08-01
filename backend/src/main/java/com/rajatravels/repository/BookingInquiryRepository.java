package com.rajatravels.repository;

import com.rajatravels.model.BookingInquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingInquiryRepository extends JpaRepository<BookingInquiry, Long> {
}
