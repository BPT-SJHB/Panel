import { ToastService } from 'app/services/toast-service/toast.service';

/**
 * Copies text to clipboard with fallback for older browsers.
 */
export async function copyText(text: string): Promise<void> {
  // Modern browsers with secure context
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback for older browsers / insecure contexts
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Make textarea invisible but still selectable
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '1px';
  textArea.style.height = '1px';
  textArea.style.opacity = '0';
  textArea.style.pointerEvents = 'none';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    // Deprecated but still works on old browsers
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  } finally {
    document.body.removeChild(textArea);
  }
}

/**
 * Copies text and shows a toast message.
 */
export async function copyTextAndToast(
  text: string,
  toast: ToastService
): Promise<void> {
  try {
    await copyText(text);
    toast.success('موفق', 'متن با موفقیت کپی شد.');
  } catch (err) {
    toast.error('خطا', '');
  }
}
