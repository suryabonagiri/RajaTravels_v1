import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentService } from './content.service';
import { InquiryRequest } from './models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly content = inject(ContentService);

  /** Persists the inquiry in the backend database. */
  submitInquiry(inquiry: InquiryRequest): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>('/api/inquiries', inquiry);
  }

  whatsAppLink(message: string): string {
    const number = this.content.business().whatsappNumber;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  openWhatsApp(message: string): void {
    window.open(this.whatsAppLink(message), '_blank');
  }

  formatBookingMessage(data: InquiryRequest): string {
    const isBusRental = data.serviceType === 'Bus Rental';
    return `✨ *New ${data.serviceType} Inquiry*
━━━━━━━━━━━━━━━━━━━━
🛠️ *Service:* ${data.serviceType}
📍 *Pickup:* ${data.startPoint}
📍 *Destination:* ${data.destination}
📅 *Journey Date:* ${data.journeyDate}
${isBusRental && data.busType ? `🚍 *Bus Type:* ${data.busType}\n` : ''}👤 *Name:* ${data.customerName}
📞 *Phone:* ${data.phone}
${data.message ? `💬 *Message:* ${data.message}` : ''}
━━━━━━━━━━━━━━━━━━━━
_Sent from Raja Travels Website_`;
  }

  formatPackageInquiry(packageName: string): string {
    return `Hi! I'm interested in the *${packageName}* package. Please share more details and availability.

_Sent from Raja Travels Website_`;
  }
}
