export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">PropertyLend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Decentralized real estate lending platform
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Invest</li>
              <li>Borrow</li>
              <li>Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Risk Disclosures</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Discord</li>
              <li>Twitter</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 PropertyLend Holdings Ltd. All rights reserved.</p>
          <p className="mt-2">Not available to US persons. Read risk disclosures.</p>
        </div>
      </div>
    </footer>
  );
}
