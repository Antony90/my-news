from apscheduler.schedulers.background import BlockingScheduler

from analyze_news import AnalyzeNews

if __name__ == '__main__':
    analyzer = AnalyzeNews()
    
    scheduler = BlockingScheduler()
    scheduler.add_job(analyzer.run, trigger='interval', hours=1)
    scheduler.start()
    print("[scheduler] Started with 1 hour interval")