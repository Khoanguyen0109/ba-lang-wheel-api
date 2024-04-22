import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { getDoc } from '../../services/sheet';

export async function getCampaign(req, res, next) {
  const [sheet, sheetPrize] = (await Promise.all([
    getDoc('campaigns'),
    getDoc('prize'),
  ])) as GoogleSpreadsheetWorksheet[];
  const data = (await sheet.getRows()).find((item) => item.get('status') === 'active').toObject();
  if (!data) {
    return res.status(404).json('404 Not Found');
  }
  const prize = (await sheetPrize.getRows())
    .filter((item) => item.get('campaignId') === data.id)
    .map((item) => item.toObject());
  Object.assign(data, { prize: prize });
  return res.status(200).json({ data: data });
}
