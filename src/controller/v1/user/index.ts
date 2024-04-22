import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { getDoc } from '../../../services/sheet';
import getCurrentDateWithTimezone from '../../../utils/getCurrentDayFormatTimezone';

export function getUser(req, res, next) {}

export async function getUserPrize(req, res, next) {
  const sheet = (await getDoc('user_prizes')) as GoogleSpreadsheetWorksheet;
  const { userId } = req.params;
  const data = (await sheet.getRows()).filter((item) => item.get('OAId') === userId).map((item) => item.toObject());
  return res.status(200).json({ data });
}

export async function addUserPrize(req, res, next) {
  const { OAId, name, phone, prizeId, prizeName, campaignId, campaignName, note } = req.body;
  const sheet = (await getDoc('users')) as GoogleSpreadsheetWorksheet;
  const user = (await sheet.getRows()).find((item) => item.get('OAId') === OAId)?.toObject();
  if (!user) {
    await sheet.addRow({
      OAId,
      name,
      phone,
      createdAt: getCurrentDateWithTimezone(),
    });
  }
  const sheetPrize = (await getDoc('user_prizes')) as GoogleSpreadsheetWorksheet;
  sheetPrize.addRow({
    OAId,
    prizeId,
    prizeName,
    campaignId,
    campaignName,
    createdAt: getCurrentDateWithTimezone(),
  });
  return res.status(200).json({ message: 'Success' });
}
