GST API Documentation
This document provides a detailed overview of the GST API, including its endpoints, request/response formats, database schema, and setup instructions.
Setup Instructions
1. Clone the repository: `git clone Automated-GST-Invoicing-System-Development`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
4. Start the server: `npm start`
5. 
Database Schema

Bookings Collection:
- `name` (String): Customer Name
- `bookingAmount` (Number): Amount booked
- `state` (String): State of booking
- `status` (String): Status of booking (e.g., 'finished')
- `igst`, `cgst`, `sgst` (Number): GST breakdown
- `gstFiled` (Boolean): Whether GST is filed or not

API Endpoints
1. Add Booking
**Endpoint:** `POST /api/bookings/add`
**Request Body:**
```json
{
  "name": "Himanshu Garg",
  "bookingAmount": 1000,
  "state": "interstate",
  "status": "finished"
}
```
**Response:**
```json
{
  "message": "Booking added successfully",
  "booking": { ... }
}
```
2. Calculate GST
**Endpoint:** `POST /api/bookings/calculate-gst`
**Request Body:**
```json
{
  "bookingAmount": 1000,
  "state": "Maharashtra"
}
```
**Response:**
```json
{
  "gstRate": 18,
  "igst": 0,
  "cgst": 90,
  "sgst": 90,
  "status": "GST Calculated Successfully"
}
```
3. File GST
**Endpoint:** `POST /api/bookings/file-gst`
**Request Body:**
```json
{
  "bookingId": "1234567890",
  "gstDetails": { ... }
}
```
**Response:**
```json
{
  "gstFilingStatus": "Filed Successfully",
  "referenceId": "GST-12345"
}
