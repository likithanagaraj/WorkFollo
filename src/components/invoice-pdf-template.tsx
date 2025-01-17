import React from 'react';

interface InvoicePDFTemplateProps {
  data: {
    InvoiceNumber: number;
    Date: Date;
    FromName: string;
    FromCompanyName: string;
    FromCompanyAddress: string;
    BankDetails: string;
    Logo?: File;
    ToName: string;
    ToAddress: string;
    ToCompanyName: string;
    Services: {
      ServiceName: string;
      UnitPrice: number;
      Quantity: number;
      Discount: number;
    }[];
  };
}

const InvoicePDFTemplate = React.forwardRef<HTMLDivElement, InvoicePDFTemplateProps>(
  ({ data }, ref) => {
    const calculateSubtotal = (services: typeof data.Services) => {
      return services.reduce((acc, service) => {
        const amount = service.UnitPrice * service.Quantity;
        const discount = (amount * service.Discount) / 100;
        return acc + (amount - discount);
      }, 0);
    };

    const subtotal = calculateSubtotal(data.Services);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
      <div ref={ref} className="p-8 max-w-4xl mx-auto bg-white ">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600">Invoice #{data.InvoiceNumber}</p>
            <p className="text-gray-600">
              Date: {new Date(data.Date).toLocaleDateString()}
            </p>
          </div>
          {data.Logo && (
            <div className="w-32">
              <img
                src={URL.createObjectURL(data.Logo)}
                alt="Company Logo"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        {/* Bill From/To Section */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Bill From:</h2>
            <div className="text-gray-700">
              <p className="font-semibold">{data.FromName}</p>
              <p>{data.FromCompanyName}</p>
              <p className="whitespace-pre-line">{data.FromCompanyAddress}</p>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Bill To:</h2>
            <div className="text-gray-700">
              <p className="font-semibold">{data.ToName}</p>
              <p>{data.ToCompanyName}</p>
              <p className="whitespace-pre-line">{data.ToAddress}</p>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Service</th>
              <th className="py-2 px-4 text-right">Unit Price</th>
              <th className="py-2 px-4 text-right">Quantity</th>
              <th className="py-2 px-4 text-right">Discount</th>
              <th className="py-2 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.Services.map((service, index) => {
              const amount = service.UnitPrice * service.Quantity;
              const discount = (amount * service.Discount) / 100;
              const final = amount - discount;

              return (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{service.ServiceName}</td>
                  <td className="py-2 px-4 text-right">
                    ${service.UnitPrice.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-right">{service.Quantity}</td>
                  <td className="py-2 px-4 text-right">{service.Discount}%</td>
                  <td className="py-2 px-4 text-right">${final.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-2">Bank Details:</h2>
          <p className="whitespace-pre-line text-gray-700">{data.BankDetails}</p>
        </div>
      </div>
    );
  }
);

InvoicePDFTemplate.displayName = 'InvoicePDFTemplate';

export default InvoicePDFTemplate;