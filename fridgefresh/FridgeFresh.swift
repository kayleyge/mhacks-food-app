import UIKit

class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Create a window to display the app's UI
        window = UIWindow(frame: UIScreen.main.bounds)
        
        // Create a view controller
        let viewController = ViewController()
        
        // Set the root view controller
        window?.rootViewController = viewController
        window?.makeKeyAndVisible()
        
        return true
    }
}

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        // Set up the view background color
        view.backgroundColor = .white

        // Create a UILabel
        let label = UILabel(frame: CGRect(x: 50, y: 100, width: 300, height: 50))
        label.text = "Hello, iOS App!"
        label.textAlignment = .center
        view.addSubview(label)

        // Create a UIButton
        let button = UIButton(type: .system)
        button.frame = CGRect(x: 50, y: 200, width: 200, height: 50)
        button.setTitle("Tap me", for: .normal)
        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
        view.addSubview(button)
    }

    @objc func buttonTapped() {
        print("Button tapped!")
    }
}

// Start the app
UIApplicationMain(
    CommandLine.argc,
    CommandLine.unsafeArgv,
    nil,
    NSStringFromClass(AppDelegate.self)
)
