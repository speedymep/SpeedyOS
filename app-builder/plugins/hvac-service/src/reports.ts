import { Report, ReportType, DataSource } from '@speedyos/reporting';

/**
 * HVAC Service Reports
 */
export const HVACServiceReports = [
  // Technician Performance Report
  new Report({
    id: 'technician-performance-report',
    name: 'Technician Performance Report',
    description: 'Analyze technician productivity, job completion rates, and customer satisfaction',
    type: ReportType.TABLE,
    dataSource: new DataSource({
      type: 'sql',
      query: `
        SELECT 
          t.name AS "Technician",
          COUNT(wo.id) AS "Total Jobs",
          AVG(EXTRACT(EPOCH FROM (wo.actualEnd - wo.actualStart))/3600) AS "Avg Hours Per Job",
          COUNT(CASE WHEN wo.status = 'Completed' THEN 1 END) AS "Completed Jobs",
          ROUND(COUNT(CASE WHEN wo.status = 'Completed' THEN 1 END)::DECIMAL / COUNT(wo.id) * 100, 2) AS "Completion Rate",
          AVG(wo.customerRating) AS "Avg Customer Rating"
        FROM 
          technicians t
        LEFT JOIN 
          work_orders wo ON t.id = wo.technician_id
        WHERE 
          wo.scheduledStart >= :startDate AND wo.scheduledStart <= :endDate
        GROUP BY 
          t.id, t.name
        ORDER BY 
          "Avg Customer Rating" DESC
      `,
    }),
    parameters: [
      { name: 'startDate', type: 'date', required: true, default: 'startOfMonth' },
      { name: 'endDate', type: 'date', required: true, default: 'endOfMonth' },
    ],
    columns: [
      { name: 'Technician', label: 'Technician', type: 'string' },
      { name: 'Total Jobs', label: 'Total Jobs', type: 'number' },
      { name: 'Avg Hours Per Job', label: 'Avg Hours Per Job', type: 'number', format: '0.0' },
      { name: 'Completed Jobs', label: 'Completed Jobs', type: 'number' },
      { name: 'Completion Rate', label: 'Completion Rate (%)', type: 'number', format: '0.0%' },
      { name: 'Avg Customer Rating', label: 'Customer Rating', type: 'number', format: '0.0' },
    ],
    visualizations: [
      {
        type: 'bar',
        title: 'Jobs Completed by Technician',
        xAxis: 'Technician',
        yAxis: 'Completed Jobs',
      },
      {
        type: 'line',
        title: 'Customer Satisfaction by Technician',
        xAxis: 'Technician',
        yAxis: 'Avg Customer Rating',
      },
    ],
  }),

  // Revenue Analysis Report
  new Report({
    id: 'revenue-analysis-report',
    name: 'Revenue Analysis Report',
    description: 'Analyze revenue by service type, customer type, and time period',
    type: ReportType.TABLE,
    dataSource: new DataSource({
      type: 'sql',
      query: `
        SELECT 
          DATE_TRUNC(:timeInterval, i.created_at) AS "Time Period",
          wo.service_type AS "Service Type",
          c.type AS "Customer Type",
          COUNT(i.id) AS "Invoice Count",
          SUM(i.total) AS "Total Revenue",
          SUM(i.labor_amount) AS "Labor Revenue",
          SUM(i.parts_amount) AS "Parts Revenue",
          AVG(i.total) AS "Average Invoice"
        FROM 
          invoices i
        JOIN 
          work_orders wo ON i.work_order_id = wo.id
        JOIN 
          customers c ON i.customer_id = c.id
        WHERE 
          i.created_at >= :startDate AND i.created_at <= :endDate
          AND i.status = 'Paid'
        GROUP BY 
          "Time Period", "Service Type", "Customer Type"
        ORDER BY 
          "Time Period", "Total Revenue" DESC
      `,
    }),
    parameters: [
      { name: 'startDate', type: 'date', required: true, default: 'startOfYear' },
      { name: 'endDate', type: 'date', required: true, default: 'endOfYear' },
      { 
        name: 'timeInterval', 
        type: 'select', 
        required: true, 
        default: 'month',
        options: [
          { value: 'day', label: 'Daily' },
          { value: 'week', label: 'Weekly' },
          { value: 'month', label: 'Monthly' },
          { value: 'quarter', label: 'Quarterly' },
          { value: 'year', label: 'Yearly' },
        ],
      },
    ],
    columns: [
      { name: 'Time Period', label: 'Time Period', type: 'date' },
      { name: 'Service Type', label: 'Service Type', type: 'string' },
      { name: 'Customer Type', label: 'Customer Type', type: 'string' },
      { name: 'Invoice Count', label: 'Invoice Count', type: 'number' },
      { name: 'Total Revenue', label: 'Total Revenue', type: 'number', format: '$0,0.00' },
      { name: 'Labor Revenue', label: 'Labor Revenue', type: 'number', format: '$0,0.00' },
      { name: 'Parts Revenue', label: 'Parts Revenue', type: 'number', format: '$0,0.00' },
      { name: 'Average Invoice', label: 'Average Invoice', type: 'number', format: '$0,0.00' },
    ],
    visualizations: [
      {
        type: 'line',
        title: 'Revenue Trend',
        xAxis: 'Time Period',
        yAxis: 'Total Revenue',
        groupBy: 'Service Type',
      },
      {
        type: 'pie',
        title: 'Revenue by Service Type',
        value: 'Total Revenue',
        category: 'Service Type',
      },
      {
        type: 'bar',
        title: 'Revenue by Customer Type',
        xAxis: 'Customer Type',
        yAxis: 'Total Revenue',
        stacked: true,
        groupBy: 'Service Type',
      },
    ],
  }),

  // Service Contract Analysis
  new Report({
    id: 'service-contract-analysis',
    name: 'Service Contract Analysis',
    description: 'Analyze service contract performance, renewal rates, and profitability',
    type: ReportType.TABLE,
    dataSource: new DataSource({
      type: 'sql',
      query: `
        SELECT 
          sc.contract_type AS "Contract Type",
          COUNT(sc.id) AS "Total Contracts",
          COUNT(CASE WHEN sc.status = 'Active' THEN 1 END) AS "Active Contracts",
          COUNT(CASE WHEN sc.status = 'Expired' THEN 1 END) AS "Expired Contracts",
          COUNT(CASE WHEN sc.renewed = TRUE THEN 1 END) AS "Renewed Contracts",
          ROUND(COUNT(CASE WHEN sc.renewed = TRUE THEN 1 END)::DECIMAL / 
                COUNT(CASE WHEN sc.end_date < CURRENT_DATE THEN 1 END) * 100, 2) AS "Renewal Rate",
          SUM(sc.contract_value) AS "Total Contract Value",
          SUM(wo.total_cost) AS "Total Service Costs",
          SUM(sc.contract_value) - SUM(wo.total_cost) AS "Net Profit",
          ROUND((SUM(sc.contract_value) - SUM(wo.total_cost)) / 
                SUM(sc.contract_value) * 100, 2) AS "Profit Margin"
        FROM 
          service_contracts sc
        LEFT JOIN 
          work_orders wo ON sc.id = wo.service_contract_id
        WHERE 
          sc.start_date >= :startDate
        GROUP BY 
          sc.contract_type
        ORDER BY 
          "Total Contract Value" DESC
      `,
    }),
    parameters: [
      { name: 'startDate', type: 'date', required: true, default: 'startOfYear' },
    ],
    columns: [
      { name: 'Contract Type', label: 'Contract Type', type: 'string' },
      { name: 'Total Contracts', label: 'Total Contracts', type: 'number' },
      { name: 'Active Contracts', label: 'Active Contracts', type: 'number' },
      { name: 'Expired Contracts', label: 'Expired Contracts', type: 'number' },
      { name: 'Renewed Contracts', label: 'Renewed Contracts', type: 'number' },
      { name: 'Renewal Rate', label: 'Renewal Rate (%)', type: 'number', format: '0.0%' },
      { name: 'Total Contract Value', label: 'Contract Value', type: 'number', format: '$0,0.00' },
      { name: 'Total Service Costs', label: 'Service Costs', type: 'number', format: '$0,0.00' },
      { name: 'Net Profit', label: 'Net Profit', type: 'number', format: '$0,0.00' },
      { name: 'Profit Margin', label: 'Profit Margin (%)', type: 'number', format: '0.0%' },
    ],
    visualizations: [
      {
        type: 'bar',
        title: 'Contract Profitability by Type',
        xAxis: 'Contract Type',
        yAxis: 'Net Profit',
      },
      {
        type: 'pie',
        title: 'Active Contracts by Type',
        value: 'Active Contracts',
        category: 'Contract Type',
      },
    ],
  }),

  // Customer Analysis Report
  new Report({
    id: 'customer-analysis-report',
    name: 'Customer Analysis Report',
    description: 'Analyze customer acquisition, retention, and lifetime value',
    type: ReportType.TABLE,
    dataSource: new DataSource({
      type: 'sql',
      query: `
        WITH customer_metrics AS (
          SELECT 
            c.id,
            c.name,
            c.type,
            c.created_at AS acquisition_date,
            COUNT(wo.id) AS total_work_orders,
            SUM(i.total) AS total_spent,
            MAX(i.created_at) AS last_service_date,
            EXTRACT(YEAR FROM AGE(NOW(), c.created_at)) AS customer_age_years
          FROM 
            customers c
          LEFT JOIN 
            work_orders wo ON c.id = wo.customer_id
          LEFT JOIN 
            invoices i ON wo.id = i.work_order_id
          GROUP BY 
            c.id, c.name, c.type, c.created_at
        )
        SELECT 
          cm.type AS "Customer Type",
          COUNT(cm.id) AS "Customer Count",
          ROUND(AVG(cm.total_work_orders), 2) AS "Avg Work Orders",
          ROUND(AVG(cm.total_spent), 2) AS "Avg Lifetime Value",
          ROUND(SUM(cm.total_spent) / SUM(cm.customer_age_years), 2) AS "Avg Annual Value",
          COUNT(CASE WHEN cm.last_service_date > NOW() - INTERVAL '1 year' THEN 1 END) AS "Active Customers",
          ROUND(COUNT(CASE WHEN cm.last_service_date > NOW() - INTERVAL '1 year' THEN 1 END)::DECIMAL / 
                COUNT(cm.id) * 100, 2) AS "Retention Rate"
        FROM 
          customer_metrics cm
        WHERE 
          cm.acquisition_date >= :startDate
        GROUP BY 
          cm.type
        ORDER BY 
          "Avg Lifetime Value" DESC
      `,
    }),
    parameters: [
      { name: 'startDate', type: 'date', required: true, default: 'startOfYear' },
    ],
    columns: [
      { name: 'Customer Type', label: 'Customer Type', type: 'string' },
      { name: 'Customer Count', label: 'Customer Count', type: 'number' },
      { name: 'Avg Work Orders', label: 'Avg Work Orders', type: 'number', format: '0.0' },
      { name: 'Avg Lifetime Value', label: 'Avg Lifetime Value', type: 'number', format: '$0,0.00' },
      { name: 'Avg Annual Value', label: 'Avg Annual Value', type: 'number', format: '$0,0.00' },
      { name: 'Active Customers', label: 'Active Customers', type: 'number' },
      { name: 'Retention Rate', label: 'Retention Rate (%)', type: 'number', format: '0.0%' },
    ],
    visualizations: [
      {
        type: 'bar',
        title: 'Customer Lifetime Value by Type',
        xAxis: 'Customer Type',
        yAxis: 'Avg Lifetime Value',
      },
      {
        type: 'pie',
        title: 'Customer Distribution by Type',
        value: 'Customer Count',
        category: 'Customer Type',
      },
    ],
  }),

  // Equipment Service History Report
  new Report({
    id: 'equipment-service-history',
    name: 'Equipment Service History Report',
    description: 'Analyze equipment reliability, service frequency, and maintenance costs',
    type: ReportType.TABLE,
    dataSource: new DataSource({
      type: 'sql',
      query: `
        SELECT 
          e.type AS "Equipment Type",
          e.manufacturer AS "Manufacturer",
          COUNT(e.id) AS "Total Units",
          COUNT(wo.id) AS "Total Service Calls",
          ROUND(COUNT(wo.id)::DECIMAL / COUNT(e.id), 2) AS "Avg Service Calls Per Unit",
          COUNT(CASE WHEN wo.service_type = 'Repair' THEN 1 END) AS "Repair Calls",
          COUNT(CASE WHEN wo.service_type = 'Maintenance' THEN 1 END) AS "Maintenance Calls",
          ROUND(COUNT(CASE WHEN wo.service_type = 'Repair' THEN 1 END)::DECIMAL / 
                COUNT(wo.id) * 100, 2) AS "Repair Percentage",
          SUM(i.total) AS "Total Service Cost",
          ROUND(SUM(i.total) / COUNT(e.id), 2) AS "Avg Cost Per Unit"
        FROM 
          equipment e
        LEFT JOIN 
          work_orders wo ON e.id = wo.equipment_id
        LEFT JOIN 
          invoices i ON wo.id = i.work_order_id
        WHERE 
          e.installation_date >= :startDate
        GROUP BY 
          e.type, e.manufacturer
        ORDER BY 
          "Repair Percentage" DESC
      `,
    }),
    parameters: [
      { name: 'startDate', type: 'date', required: true, default: 'startOfYear' },
    ],
    columns: [
      { name: 'Equipment Type', label: 'Equipment Type', type: 'string' },
      { name: 'Manufacturer', label: 'Manufacturer', type: 'string' },
      { name: 'Total Units', label: 'Total Units', type: 'number' },
      { name: 'Total Service Calls', label: 'Total Service Calls', type: 'number' },
      { name: 'Avg Service Calls Per Unit', label: 'Avg Calls Per Unit', type: 'number', format: '0.0' },
      { name: 'Repair Calls', label: 'Repair Calls', type: 'number' },
      { name: 'Maintenance Calls', label: 'Maintenance Calls', type: 'number' },
      { name: 'Repair Percentage', label: 'Repair Percentage (%)', type: 'number', format: '0.0%' },
      { name: 'Total Service Cost', label: 'Total Service Cost', type: 'number', format: '$0,0.00' },
      { name: 'Avg Cost Per Unit', label: 'Avg Cost Per Unit', type: 'number', format: '$0,0.00' },
    ],
    visualizations: [
      {
        type: 'bar',
        title: 'Service Calls by Equipment Type',
        xAxis: 'Equipment Type',
        yAxis: 'Total Service Calls',
        stacked: true,
        groupBy: 'Manufacturer',
      },
      {
        type: 'scatter',
        title: 'Repair Rate vs. Cost',
        xAxis: 'Repair Percentage',
        yAxis: 'Avg Cost Per Unit',
        size: 'Total Units',
        category: 'Equipment Type',
      },
    ],
  }),
];