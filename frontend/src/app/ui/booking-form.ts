import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../core/booking.service';
import { ContentService } from '../core/content.service';
import { InquiryRequest } from '../core/models';

@Component({
  selector: 'app-booking-form',
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="form"
      class="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 md:p-10 max-w-2xl mx-auto border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden"
    >
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gold/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="text-center mb-10 relative z-10">
        <span
          class="inline-block py-1.5 px-4 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        >
          Reserve Your Experience
        </span>
        <h3
          class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 font-heading mb-4 tracking-tight"
        >
          Book Your Journey
        </h3>
        <p class="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
          Experience luxury travel across Andhra Pradesh. Select your service below and let us handle every detail.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label for="serviceType" class="form-label">Service Required</label>
          <select id="serviceType" formControlName="serviceType" class="form-input appearance-none cursor-pointer">
            <option value="" class="text-gray-900">Select Service Type</option>
            <option value="Bus Rental" class="text-gray-900">Premium Bus Rental</option>
            <option value="Papikondalu Package" class="text-gray-900">Papikondalu Luxury Tour</option>
            <option value="Maredumilli Package" class="text-gray-900">Maredumilli Eco Tour</option>
            <option value="Bhadrachalam Package" class="text-gray-900">Bhadrachalam Divine Tour</option>
            <option value="Other Service" class="text-gray-900">Other Custom Travel</option>
          </select>
        </div>

        <div>
          <label for="startPoint" class="form-label">Pickup Location</label>
          <input id="startPoint" type="text" formControlName="startPoint" placeholder="e.g., Rajahmundry" class="form-input" />
        </div>

        <div>
          <label for="destination" class="form-label">Destination</label>
          <input id="destination" type="text" formControlName="destination" placeholder="e.g., Hyderabad" class="form-input" />
        </div>

        <div>
          <label for="journeyDate" class="form-label">Journey Date</label>
          <input id="journeyDate" type="date" formControlName="journeyDate" class="form-input [color-scheme:dark]" />
        </div>

        @if (form.controls.serviceType.value === 'Bus Rental') {
          <div>
            <label for="busType" class="form-label">Bus Type (Seater)</label>
            <select id="busType" formControlName="busType" class="form-input appearance-none cursor-pointer">
              <option value="" class="text-gray-900">Select Bus Type</option>
              @for (type of content.business().busTypes; track type) {
                <option [value]="type" class="text-gray-900">{{ type }}</option>
              }
            </select>
          </div>
        }

        <div>
          <label for="customerName" class="form-label">Your Name</label>
          <input id="customerName" type="text" formControlName="customerName" placeholder="Full Name" class="form-input" />
        </div>

        <div>
          <label for="phone" class="form-label">Phone Number</label>
          <input id="phone" type="tel" formControlName="phone" placeholder="Your Phone Number" class="form-input" />
        </div>

        <div class="md:col-span-2">
          <label for="message" class="form-label">Message (Optional)</label>
          <textarea
            id="message"
            formControlName="message"
            placeholder="Any special requirements..."
            class="form-input resize-none h-20"
            rows="2"
          ></textarea>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <button
          type="button"
          (click)="submitViaWhatsApp()"
          [disabled]="!isValid()"
          class="relative z-10 flex items-center justify-center gap-2 py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 shimmer cursor-pointer text-sm tracking-wide"
        >
          <i class="fa-brands fa-whatsapp text-xl"></i>
          WhatsApp Booking
        </button>

        <button
          type="button"
          (click)="submitInquiry()"
          [disabled]="!isValid() || sending()"
          class="relative z-10 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 shimmer cursor-pointer text-sm tracking-wide border border-white/10"
        >
          @if (sending()) {
            <i class="fa-solid fa-spinner text-xl animate-spin"></i>
          } @else {
            <i class="fa-solid fa-envelope text-xl"></i>
          }
          {{ sent() ? 'Sent Successfully ✓' : 'Send Inquiry' }}
        </button>
      </div>

      @if (sent()) {
        <p class="text-emerald-light text-center text-sm mt-3">
          ✓ Inquiry received! We will get back to you shortly.
        </p>
      }
      @if (error()) {
        <p class="text-red-400 text-center text-sm mt-3">
          Something went wrong saving your inquiry. Please try WhatsApp or call us directly.
        </p>
      }
    </form>
  `,
  styles: `
    .form-label {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .form-input {
      width: 100%;
      padding: 0.875rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      color: white;
      font-size: 0.875rem;
      backdrop-filter: blur(12px);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
      outline: none;
    }

    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .form-input:focus {
      border-color: rgba(245, 158, 11, 0.8);
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.5);
    }
  `,
})
export class BookingForm {
  protected readonly content = inject(ContentService);
  private readonly booking = inject(BookingService);
  private readonly fb = inject(FormBuilder);

  protected readonly sending = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    serviceType: ['', Validators.required],
    startPoint: ['', Validators.required],
    destination: ['', Validators.required],
    journeyDate: ['', Validators.required],
    busType: [''],
    customerName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]{7,15}$/)]],
    message: [''],
  });

  protected isValid(): boolean {
    const value = this.form.getRawValue();
    return this.form.valid && (value.serviceType !== 'Bus Rental' || value.busType !== '');
  }

  /** Saves the inquiry in the backend, then opens WhatsApp with the prefilled message. */
  protected submitViaWhatsApp(): void {
    if (!this.isValid()) {
      return;
    }
    const inquiry = this.form.getRawValue() as InquiryRequest;
    this.booking.submitInquiry(inquiry).subscribe({ error: () => {} });
    this.booking.openWhatsApp(this.booking.formatBookingMessage(inquiry));
  }

  /** Saves the inquiry in the backend only; the team calls the customer back. */
  protected submitInquiry(): void {
    if (!this.isValid()) {
      return;
    }
    this.sending.set(true);
    this.error.set(false);
    const inquiry = this.form.getRawValue() as InquiryRequest;
    this.booking.submitInquiry(inquiry).subscribe({
      next: () => {
        this.sending.set(false);
        this.sent.set(true);
        setTimeout(() => this.sent.set(false), 4000);
      },
      error: () => {
        this.sending.set(false);
        this.error.set(true);
      },
    });
  }
}
