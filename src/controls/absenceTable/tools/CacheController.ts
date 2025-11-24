export class CacheController {
  /**
   * Сохраняет данные в указанное хранилище.
   */
  static save<T>(key: string, data: T, useSession = false): void {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`Error saving data to ${useSession ? 'sessionStorage' : 'localStorage'}:`, err);
    }
  }

  /**
   * Загружает данные из хранилища.
   */
  static load<T>(key: string, useSession = false): T | null {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      const data = storage.getItem(key);
      return data ? JSON.parse(data) as T : null;
    } catch (err) {
      console.error(`Error loading data from ${useSession ? 'sessionStorage' : 'localStorage'}:`, err);
      return null;
    }
  }

  /**
   * Удаляет данные по ключу.
   */
  static remove(key: string, useSession = false): void {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      storage.removeItem(key);
    } catch (err) {
      console.error(`Error removing data from ${useSession ? 'sessionStorage' : 'localStorage'}:`, err);
    }
  }

  /**
   * Полностью очищает выбранное хранилище.
   */
  static clear(useSession = false): void {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      storage.clear();
    } catch (err) {
      console.error(`Error clearing ${useSession ? 'sessionStorage' : 'localStorage'}:`, err);
    }
  }
}
