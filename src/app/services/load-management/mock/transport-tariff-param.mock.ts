import { TransportTariffParam } from '../model/transport-tariff-param.model';

export const mockTransportTariffParamInString = {
  TPTParams:
    '135:0;139:0;143:0;147:0;151:0;157:0;16:0;163:0;169:0;175:0;181:0;187:0;193:0;199:0;205:0;211:0;217:0;223:0;229:0;235:0',
};

export const mockTransportTariffParams: TransportTariffParam[] = [
  {
    TPTPDId: 135,
    TPTPTitle: 'دو باسکوله (ذوب آهنی)',
    Cost: 6000000,
    Checked: false,
  },
  {
    TPTPDId: 139,
    TPTPTitle: 'سه باسکوله (ذوب آهنی)',
    Cost: 10000000,
    Checked: false,
  },
  {
    TPTPDId: 143,
    TPTPTitle: 'چهار باسکوله (ذوب آهنی)',
    Cost: 14000000,
    Checked: false,
  },
  {
    TPTPDId: 147,
    TPTPTitle: 'شب آخر',
    Cost: 5000000,
    Checked: false,
  },
  {
    TPTPDId: 151,
    TPTPTitle: 'کلاف',
    Cost: 9000000,
    Checked: false,
  },
  {
    TPTPDId: 157,
    TPTPTitle: 'پروژه',
    Cost: 7000000,
    Checked: false,
  },
  {
    TPTPDId: 16,
    TPTPTitle: 'دومحل تخلیه (توافقی)',
    Cost: 0,
    Checked: false,
  },
  {
    TPTPDId: 163,
    TPTPTitle: 'تیرآهن نرمال',
    Cost: 7000000,
    Checked: false,
  },
  {
    TPTPDId: 169,
    TPTPTitle: 'میلگرد نرمال',
    Cost: 5000000,
    Checked: false,
  },
  {
    TPTPDId: 175,
    TPTPTitle: 'طرح شهری (روز تخلیه)',
    Cost: 10000000,
    Checked: false,
  },
  {
    TPTPDId: 181,
    TPTPTitle: 'طرح شهری محل خاص و پروژه  (شب تخلیه)',
    Cost: 16000000,
    Checked: false,
  },
  {
    TPTPDId: 187,
    TPTPTitle: 'طرح (شهرستان)',
    Cost: 10000000,
    Checked: false,
  },
  {
    TPTPDId: 193,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک بدون جابجایی)',
    Cost: 8000000,
    Checked: false,
  },
  {
    TPTPDId: 199,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور بدون جابجایی)',
    Cost: 13000000,
    Checked: false,
  },
  {
    TPTPDId: 205,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 50%)',
    Cost: 14000000,
    Checked: false,
  },
  {
    TPTPDId: 211,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار نزدیک با جابجایی 70%)',
    Cost: 23000000,
    Checked: false,
  },
  {
    TPTPDId: 217,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 50%)',
    Cost: 19000000,
    Checked: false,
  },
  {
    TPTPDId: 223,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (انبار دور با جابجایی 70%)',
    Cost: 28000000,
    Checked: false,
  },
  {
    TPTPDId: 229,
    TPTPTitle: 'دو محل بارگیری ذوب و انبار (جابجایی 100% = کرایه کامل شهری)',
    Cost: 0,
    Checked: false,
  },
  {
    TPTPDId: 235,
    TPTPTitle:
      'دو محل بارگیری ذوب و انبار (انبار دور با فاصله غیر متعارف = توافق دو صنف)',
    Cost: 0,
    Checked: false,
  },
];
