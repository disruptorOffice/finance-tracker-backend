// Archivo para definir y ejecutar todos los procesos cron del proyecto
import cron from 'node-cron';
import { ScheduledService } from '../services/scheduled.service';
import { FinanceService } from '../services/finance.service';

const scheduledService = new ScheduledService();
const financeService = new FinanceService();

// Proceso cron: Ejecutar todos los días a las 15:00
cron.schedule('0 15 * * *', async () => {
  try {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    // Buscar pagos programados para el día actual
    const paymentsToday = await scheduledService.findPaymentsToday(day);
    for (const payment of paymentsToday) {
      const p = payment.get({ plain: true });
      await financeService.storeFinance({
        amount: p.amount,
        concept: p.concept,
        type_amount: 'expense',
        user_id: p.user_id,
        category_id: p.category_id,
        type_payment_id: p.type_payment_id,
        date_record: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }, { user_id: p.user_id });
    }
    console.log(`[CRON] Pagos programados procesados para el día ${day}`);
  } catch (error) {
    console.error('[CRON] Error procesando pagos programados:', error);
  }
});

export default cron;
